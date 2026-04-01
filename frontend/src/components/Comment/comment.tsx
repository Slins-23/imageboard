import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import commentStyle from "./comment.module.css";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CommentObject } from "./types";
import {
    CSSProperties,
    type KeyboardEvent,
    type MouseEvent,
    type HTMLAttributes,
    ReactNode,
    useEffect,
    useState,
    useRef,
    useId,
} from "react";
import {
    randomRecentUploadTimestamp,
    useControllableState,
} from "@/utils/utils";
import Link from "next/link";
import Button from "@/components/Button/button";
import UserPlaceholder from "@/components/UserPlaceholder/userPlaceholder";
import Image from "next/image";
import Tooltip from "../Tooltip/tooltip";
import { CommentLike } from "@/types/like";
import placeholderStyle from "@/components/UserPlaceholder/userPlaceholder.module.css";

interface CommentArgs extends HTMLAttributes<HTMLDivElement> {
    defaultCommentObj?: CommentObject;
    commentObj?: CommentObject;
    defaultLikeData?: CommentLike;
    likeData?: CommentLike;
    onTrashClick?: () => void;
    onDelete?: () => boolean;
    onDeleted?: () => void;
    onReply?: () => boolean;
    onReplied?: () => void;
    onLike?: (commentObj: CommentObject) => boolean;
    onLiked?: (commentObj: CommentObject) => void;
    onUnlike?: (commentObj: CommentObject) => boolean;
    onUnliked?: (commentObj: CommentObject) => void;
    onLikeChange?: (nextValue: CommentLike | null) => void;
    children?: ReactNode;
}

function defaultOnLike(comment: CommentObject) {
    const success = Math.round(Math.random());

    if (success) {
        Tooltip("Server-side like persisted");
        return true;
    } else {
        Tooltip("Failed to persist server-side like");
        return false;
    }
}

function defaultOnUnlike(comment: CommentObject) {
    const success = Math.round(Math.random());

    if (success) {
        Tooltip("Server-side unlike persisted");
        return true;
    } else {
        Tooltip("Failed to persist server-side unlike");
        return false;
    }
}

function defaultOnLiked() {
    Tooltip("Successfully liked comment server-side");
}

function defaultOnUnliked() {
    Tooltip("Successfully removed like from comment server-side");
}

export default function Comment({
    defaultCommentObj = {
        userData: {
            id: "1337",
            username: "Slins",
            // avatar: "/images/thumb/userb.jpg",
        },
        comment: {
            created_at: randomRecentUploadTimestamp(),
            id: "commentB",
            text: "This is my comment, so I can delete it. Writing some more placeholder text here, just to make sure everything fits and is readable...",
            post: "postID",
            posted_by: "Slins",
            reply_to: undefined,
        },
        metrics: {
            id: "commentB",
            likes: 240,
            replies: 0,
        },
    },
    commentObj,
    defaultLikeData = {
        id: "-1",
        comment: defaultCommentObj.comment.id,
        liked_by: "-1",
        liked_at: -1,
    },
    likeData,
    onTrashClick,
    onDelete,
    onDeleted,
    onReply,
    onReplied,
    onLike = defaultOnLike,
    onLiked = defaultOnLiked,
    onLikeChange,
    onUnlike = defaultOnUnlike,
    onUnliked = defaultOnUnliked,
    children,
    ...args
}: CommentArgs) {
    const [internalCommentObj, setInternalCommentObj] =
        useControllableState<CommentObject>({
            defaultValue: defaultCommentObj,
            value: commentObj,
            onChange: undefined,
        });

    const avatarLabel = useId();

    const [internalLikeData, setInternalLikeData] =
        useControllableState<CommentLike | null>({
            defaultValue: defaultLikeData,
            value: likeData,
            onChange: onLikeChange,
        });

    const [isLiked, setIsLiked] = useState<boolean>(
        internalLikeData ? true : false
    );

    const likeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debouncedLikeDelayMS = 1000;

    const handleLike = (
        event: MouseEvent<SVGSVGElement> | KeyboardEvent<SVGSVGElement>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        // if (mockLoggedInID === internalCommentObj?.userData.id) return;

        const nextValue = !isLiked;

        // Like icon changes first so there's no visual delay for the user
        // Server-side persistence is handled asynchronously
        setIsLiked(nextValue);

        if (likeTimerRef.current) clearTimeout(likeTimerRef.current);

        likeTimerRef.current = setTimeout(() => {
            // Placeholder for result of server-side function for either liking or unliking
            const success = nextValue
                ? onLike?.(internalCommentObj as CommentObject)
                : onUnlike?.(internalCommentObj as CommentObject);

            if (success) {
                if (nextValue) onLiked?.(internalCommentObj as CommentObject);
                else onUnliked?.(internalCommentObj as CommentObject);
            } else {
                setIsLiked(!nextValue);

                Tooltip(
                    `Error: Could not ${nextValue ? "like" : "unlike"} comment.`
                );
            }

            /*
            if (nextValue) {
                onLike?.(internalCommentObj as CommentObject);
            } else {
                onUnlike?.(internalCommentObj as CommentObject);
            }
            */
        }, debouncedLikeDelayMS);

        // Make sure that user cannot like their own comment (automatically liked and does not change if it's own user's)
        // Also, make sure that server-side likes are done relative to the logged-in user (can be infered, global shared state, or needs to be a explicit parameter?)
        //const success = onLike?.(internalCommentObj);
        // const success = Math.round(Math.random());

        /*
                        if (success) {
                            Tooltip("Liked!");
                        } else {
                            Tooltip("Disliked!");
                        }
                        */
    };

    const postedDate = new Date(
        internalCommentObj?.comment.created_at as number
    );

    const currentTimestamp = Date.now();

    const parseDateText = () => {
        if (internalCommentObj === undefined) return "";

        const timeElapsedMS =
            currentTimestamp -
            (internalCommentObj?.comment.created_at as number);

        const msPerSecond = 1000;
        const msPerMinute = msPerSecond * 60;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerWeek = msPerDay * 7;
        const msPerMonth = msPerWeek * 4;
        const msPerYear = msPerMonth * 12;

        if (timeElapsedMS <= msPerSecond) {
            return "Now";
        } else if (timeElapsedMS <= msPerMinute) {
            const secondsElapsed = Math.floor(timeElapsedMS / msPerSecond);

            return `${secondsElapsed} ${secondsElapsed === 1 ? "second" : "seconds"} ago`;
        } else if (timeElapsedMS <= msPerHour) {
            const minutesElapsed = Math.floor(timeElapsedMS / msPerMinute);

            return `${minutesElapsed} ${minutesElapsed === 1 ? "minute" : "minutes"} ago`;
        } else if (timeElapsedMS <= msPerDay) {
            const hoursElapsed = Math.floor(timeElapsedMS / msPerHour);

            return `${hoursElapsed} ${hoursElapsed === 1 ? "hour" : "hours"} ago`;
        } else if (timeElapsedMS <= msPerWeek) {
            const daysElapsed = Math.floor(timeElapsedMS / msPerDay);

            return `${daysElapsed} ${daysElapsed === 1 ? "day" : "days"} ago`;
        } else if (timeElapsedMS <= msPerMonth) {
            const weeksElapsed = Math.floor(timeElapsedMS / msPerWeek);

            return `${weeksElapsed} ${weeksElapsed === 1 ? "week" : "weeks"} ago`;
        } else if (timeElapsedMS <= msPerYear) {
            const monthsElapsed = Math.floor(timeElapsedMS / msPerMonth);

            return `${monthsElapsed} ${monthsElapsed === 1 ? "month" : "months"} ago`;
        } else {
            return postedDate.toLocaleDateString(undefined, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        }
    };

    const [timestampText, setTimestampText] = useState("");

    useEffect(() => {
        setTimestampText(parseDateText());
    }, []);

    const mockLoggedInID = "1337";

    const handleDeleteComment = (
        event: MouseEvent<SVGSVGElement> | KeyboardEvent<SVGSVGElement>
    ) => {
        event?.stopPropagation();
        event?.preventDefault();

        onTrashClick?.();
    };

    return (
        <div
            className={commentStyle.comment}
            {...args}
        >
            <Link
                className={commentStyle.avatarLink}
                href={`/users/${internalCommentObj?.userData.username}`}
            >
                {internalCommentObj?.userData.avatar === undefined ? (
                    <UserPlaceholder
                        cardProps={{
                            "aria-label": `avatarPlaceholder-${avatarLabel}`,
                            className: `${placeholderStyle["avatar-card"]} ${commentStyle.avatar}`,
                            style: {
                                cursor: "pointer",
                                padding: "0",
                            },
                            // tabIndex: 0,
                            role: "button",
                        }}
                        size="40px"
                        iconWidthScale={1.05}
                        iconHeightScale={1.05}
                    />
                ) : (
                    <Image
                        className={commentStyle.avatar}
                        src={internalCommentObj.userData.avatar}
                        alt={internalCommentObj.userData.username}
                        width={40}
                        height={40}
                    />
                )}
            </Link>

            <div className={commentStyle.centralWrapper}>
                <div className={commentStyle.topContent}>
                    <Link
                        className={commentStyle.username}
                        href={`/users/${internalCommentObj?.userData.username}`}
                    >
                        {internalCommentObj?.userData.username}
                    </Link>

                    <span className={commentStyle.postTime}>
                        {timestampText}
                    </span>
                    {internalCommentObj?.userData.id === mockLoggedInID && (
                        <FontAwesomeIcon
                            className={commentStyle.trashIcon}
                            icon={faTrash}
                            aria-label="Delete"
                            aria-hidden="false"
                            tabIndex={0}
                            onClick={handleDeleteComment}
                            onKeyDown={(
                                event: KeyboardEvent<SVGSVGElement>
                            ) => {
                                switch (event.code) {
                                    case "Space":
                                    case "Enter": {
                                        event.preventDefault();
                                        event.stopPropagation();

                                        handleDeleteComment(event);
                                        break;
                                    }
                                    default: {
                                        break;
                                    }
                                }
                            }}

                            // onClick={(event) => {
                            //     event.stopPropagation();

                            //     setSelectedDeleteComment(internalCommentObj?.comment.id);

                            //     if (!isDeleteDialogOpen) setIsDeleteDialogOpen(true);
                            // }}

                            // onKeyDown={(event: KeyboardEvent<SVGSVGElement>) => {
                            //     switch (event.code) {
                            //         case "Space":
                            //         case "Enter": {
                            //             event.preventDefault();
                            //             event.stopPropagation();

                            //             setSelectedDeleteComment(internalCommentObj?.comment.id);

                            //             if (!isDeleteDialogOpen)
                            //                 setIsDeleteDialogOpen(true);

                            //             break;
                            //         }
                            //         default: {
                            //             break;
                            //         }
                            //     }
                            // }}
                        />
                    )}
                    <Button
                        className={commentStyle.reply}
                        style={{ "--text-color-hover": "red" } as CSSProperties}
                    >
                        Reply
                    </Button>
                </div>
                <div className={commentStyle.bottomContent}>
                    {internalCommentObj?.comment.text}
                </div>
            </div>
            <div className={commentStyle.likesWrapper}>
                <FontAwesomeIcon
                    className={commentStyle.heartIcon}
                    icon={faHeart}
                    aria-label="Like"
                    aria-hidden="false"
                    aria-disabled={
                        mockLoggedInID === internalCommentObj?.userData.id
                    }
                    tabIndex={0}
                    data-isliked={isLiked}
                    onClick={handleLike}
                    onKeyDown={(event: KeyboardEvent<SVGSVGElement>) => {
                        switch (event.code) {
                            case "Space":
                            case "Enter": {
                                event.preventDefault();
                                event.stopPropagation();

                                handleLike(event);
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    }}
                />
                <span className={commentStyle.likeCount}>
                    {internalCommentObj?.metrics.likes}
                </span>
            </div>
        </div>
    );
}
