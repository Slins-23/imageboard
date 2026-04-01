import commentsOverlayStyle from "./commentsOverlay.module.css";
import DialogCard from "@/components/DialogCard/dialogCard";
import TextBox from "@/components/TextBox/textBox";
import Button from "@/components/Button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowDown,
    faArrowRight,
    faArrowUp,
    faCircleNotch,
    faHeart,
    faPlus,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useCallback, useRef, useState } from "react";
import Image from "next/image";
import {
    delay,
    randomRecentUploadTimestamp,
    useControllableState,
} from "@/utils/utils";
import DeleteAlbumDialog from "@/components/DialogCard/deleteAlbum";
import * as Modal from "@/components/Modal/modal";
import Tooltip from "@/components/Tooltip/tooltip";
import type { Album } from "@/types/album";
import CreateAlbumDialog from "@/components/DialogCard/createAlbum";
import type { PostBody } from "@/types/post";
import type { KeyboardEvent, MouseEvent, ChangeEvent, InputEvent } from "react";
import {
    type Comment as CommentInterface,
    CommentMetrics,
} from "@/types/comment";
import {
    getPositionOfLineAndCharacter,
    isJsxOpeningLikeElement,
} from "typescript";
import DeleteCommentDialog from "../DialogCard/deleteComment";
import Comment from "@/components/Comment/comment";
import type {
    CommentObject,
    CommentUserData,
} from "@/components/Comment/types";
import TextArea from "@/components/TextArea/textArea";

interface CommentsOverlayArgs {
    defaultComments?: CommentObject[];
    comments?: CommentObject[];

    onCommentsChange?: (comments: CommentObject[]) => void;
    // true on success, false on failure
    onLike?: () => boolean;
    onComment?: () => boolean;
    onCommented?: (comment: CommentObject) => void;
    onCommentDelete?: (comment: CommentObject) => boolean;
    onCommentDeleted?: (comment: CommentObject) => void;
    onReply?: () => boolean;
    onReplied?: () => void;
    children?: ReactNode;
}

export default function CommentsOverlay({
    defaultComments = [
        {
            userData: {
                id: "",
                username: "whoever",
                avatar: undefined,
            },
            comment: {
                created_at: randomRecentUploadTimestamp(),
                id: "commentA",
                text: "I don't know what to say here, but this should be a regular comment",
                post: "postID",
                posted_by: "whoever",
                reply_to: undefined,
            },
            metrics: {
                id: "commentA",
                likes: 240,
                replies: 9,
            },
        },
        {
            userData: {
                id: "1337",
                username: "Slins",
                avatar: "/images/thumb/userb.jpg",
            },
            comment: {
                created_at: randomRecentUploadTimestamp(),
                id: "commentB",
                text: "This is my comment, so I can delete it",
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
        {
            userData: {
                id: "",
                username: "whoever",
                avatar: undefined,
            },
            comment: {
                created_at: randomRecentUploadTimestamp(),
                id: "commentC",
                text: "I don't know what to say here, but this should be a regular comment",
                post: "postID",
                posted_by: "whoever",
                reply_to: undefined,
            },
            metrics: {
                id: "commentC",
                likes: 240,
                replies: 26,
            },
        },
        {
            userData: {
                id: "",
                username: "whoever",
                avatar: undefined,
            },
            comment: {
                created_at: randomRecentUploadTimestamp(),
                id: "commentD",
                text: "I don't know what to say here, but this should be a regular comment",
                post: "postID",
                posted_by: "whoever",
                reply_to: undefined,
            },
            metrics: {
                id: "commentD",
                likes: 240,
                replies: 0,
            },
        },
        {
            userData: {
                id: "",
                username: "whoever",
                avatar: undefined,
            },
            comment: {
                created_at: randomRecentUploadTimestamp(),
                id: "commentE",
                text: "I don't know what to say here, but this should be a regular comment",
                post: "postID",
                posted_by: "whoever",
                reply_to: undefined,
            },
            metrics: {
                id: "commentE",
                likes: 240,
                replies: 0,
            },
        },
        {
            userData: {
                id: "",
                username: "whoever",
                avatar: undefined,
            },
            comment: {
                created_at: randomRecentUploadTimestamp(),
                id: "commentF",
                text: "I don't know what to say here, but this should be a regular comment",
                post: "postID",
                posted_by: "whoever",
                reply_to: undefined,
            },
            metrics: {
                id: "commentF",
                likes: 240,
                replies: 0,
            },
        },
        {
            userData: {
                id: "",
                username: "whoever",
                avatar: undefined,
            },
            comment: {
                created_at: randomRecentUploadTimestamp(),
                id: "commentG",
                text: "I don't know what to say here, but this should be a regular comment",
                post: "postID",
                posted_by: "whoever",
                reply_to: undefined,
            },
            metrics: {
                id: "commentG",
                likes: 240,
                replies: 0,
            },
        },
        {
            userData: {
                id: "",
                username: "whoever",
                avatar: undefined,
            },
            comment: {
                created_at: randomRecentUploadTimestamp(),
                id: "commentH",
                text: "I don't know what to say here, but this should be a regular comment",
                post: "postID",
                posted_by: "whoever",
                reply_to: undefined,
            },
            metrics: {
                id: "commentH",
                likes: 240,
                replies: 0,
            },
        },
        {
            userData: {
                id: "",
                username: "whoever",
                avatar: undefined,
            },
            comment: {
                created_at: randomRecentUploadTimestamp(),
                id: "commentI",
                text: "I don't know what to say here, but this should be a regular comment",
                post: "postID",
                posted_by: "whoever",
                reply_to: undefined,
            },
            metrics: {
                id: "commentI",
                likes: 240,
                replies: 0,
            },
        },
        {
            userData: {
                id: "",
                username: "whoever",
                avatar: undefined,
            },
            comment: {
                created_at: randomRecentUploadTimestamp(),
                id: "commentJ",
                text: "I don't know what to say here, but this should be a regular comment",
                post: "postID",
                posted_by: "whoever",
                reply_to: undefined,
            },
            metrics: {
                id: "commentJ",
                likes: 240,
                replies: 0,
            },
        },
    ],
    comments,
    onCommentsChange,
    onComment,
    onCommented,
    onCommentDelete,
    onCommentDeleted,
    onReply,
    onReplied,
    children,
}: CommentsOverlayArgs) {
    const mockUserID = "1337"; // To mirror behavior of allowing user to delete their own comment and disallow liking it
    const mockPostComments = 36; // Counter for how many comments there are in the post

    const [internalComments, setInternalComments] = useControllableState({
        defaultValue: defaultComments,
        value: comments,
        onChange: onCommentsChange,
    });

    const [commentText, setCommentText] = useState<string>("");

    const [submittingComment, setSubmittingComment] = useState(false);

    const commentRefs = useRef<(HTMLLIElement | null)[]>([]);

    const [selectedDeleteComment, setSelectedDeleteComment] =
        useState<CommentObject | null>(null);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const setCommentRef = useCallback(
        (element: HTMLLIElement | null, index: number) => {
            if (!commentRefs.current) return;

            if (element && !commentRefs.current.includes(element)) {
                commentRefs.current[index] = element;
            }
        },
        []
    );

    const submitIconRef = useRef<SVGSVGElement | null>(null);

    const handleCommentCreation = async (
        event:
            | MouseEvent<SVGSVGElement>
            | KeyboardEvent<SVGSVGElement>
            | KeyboardEvent<HTMLTextAreaElement>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        if (submittingComment) {
            return;
        }

        setSubmittingComment(true);

        const comment: CommentObject = {
            comment: {
                created_at: Date.now(),
                id: "generatenewcommentid",
                post: "thispost",
                posted_by: "loggedinuserid",
                text: commentText,
                reply_to: undefined,
            },
            metrics: {
                id: "generatenewcommentid",
                likes: 0,
                replies: 0,
            },
            userData: {
                id: "1337",
                username: "loggedinusername",
                avatar: undefined,
            },
        };

        // const success = onComment?.(post, reply_to);

        await delay(Math.random() * 3000);
        // await delay(99000);
        // Placeholder for waiting network response for posting comment server-side

        // const icon = event.target as SVGSVGElement;
        // Change icon to loading, make button disabled

        const success = Math.round(Math.random());

        if (success) {
            // Placeholder for server-side function to add post to album
            onCommented?.(comment);
            Tooltip(`Successfully posted comment`);
        } else {
            Tooltip(`Error: Could not make the comment`);
        }

        setSubmittingComment(false);
        // Change icon to arrow
    };

    return (
        <DialogCard
            cardProps={{ style: { padding: "0" } }}
            wrapperArgs={{
                style: {
                    padding: "1.375rem 0.625rem",
                    gap: "1rem",
                    width: "470px",
                    height: "585px",
                },
            }}
        >
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.75rem",
                }}
            >
                <TextArea
                    style={{
                        borderRadius: "10px",
                        padding: "0.75rem 2.5rem 0.75rem 1rem",
                        flexShrink: "0",
                        width: "100%",
                        height: "auto",
                    }}
                    placeholder="Type your comment here..."
                    resize="none"
                    rows={1}
                    value={commentText}
                    onInput={(event: InputEvent<HTMLTextAreaElement>) => {
                        const target: HTMLTextAreaElement = event.currentTarget;

                        target.style.height = "auto";
                        target.style.height = `${target.scrollHeight}px`;
                    }}
                    maxLength={150}
                    onTextChange={setCommentText}
                    onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
                        switch (event.code) {
                            case "Enter": {
                                event.preventDefault();
                                event.stopPropagation();

                                handleCommentCreation(event);

                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    }}
                ></TextArea>
                <FontAwesomeIcon
                    ref={submitIconRef}
                    className={commentsOverlayStyle.commentSubmitIcon}
                    icon={submittingComment ? faCircleNotch : faArrowDown}
                    tabIndex={submittingComment ? -1 : 0}
                    aria-disabled={submittingComment ? true : false}
                    aria-hidden={false}
                    aria-label="Submit"
                    onClick={handleCommentCreation}
                    onKeyDown={(event) => {
                        switch (event.code) {
                            case "Space":
                            case "Enter": {
                                event.preventDefault();
                                event.stopPropagation();

                                handleCommentCreation(event);

                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    }}
                />
            </div>
            <span style={{ fontSize: "var(--font-size-xl)" }}>
                <span style={{ color: "var(--tertiary)" }}>
                    {mockPostComments}
                </span>{" "}
                comments
            </span>
            <ul className={commentsOverlayStyle.commentList}>
                {internalComments?.map(
                    (commentObj: CommentObject, idx: number) => (
                        <li
                            ref={(element) => setCommentRef(element, idx)}
                            key={commentObj.comment.id}
                            className={commentsOverlayStyle.comment}
                        >
                            <Comment
                                commentObj={commentObj}
                                onTrashClick={() => {
                                    if (!isDeleteDialogOpen)
                                        setIsDeleteDialogOpen(true);
                                    else return;

                                    setSelectedDeleteComment(commentObj);
                                }}
                            />
                            <div
                                key={commentObj.comment.id}
                                className={commentsOverlayStyle.commentWrapper}
                            ></div>
                            {/*
                            {repliesNotExpanded ? (
                                <div onClick={expandCommentReplies}>
                                    <FontAwesomeIcon icon={faArrowDown} />{" "}
                                    <span>
                                        {commentObj.metrics.replies} replies
                                    </span>
                                </div> : <div onClick={collapseCommentReplies}>
                                    <FontAwesomeIcon icon={faArrowUp} />{" "}
                                    <span>
                                        Hide replies
                                    </span>
                                </div>
                            )}
                            {repliesExpanded && (
                                <ul>
                                    <li> <button onClick={onCommented(reply_id)}>Reply</button> Reply 1</li>
                                    <li>Reply 2</li>
                                </ul>
                            )}
                            {repliesExpanded && repliesLeft > 0 && (
                                <div onClick={expandCommentReplies}>
                                    <FontAwesomeIcon icon={faArrowDown} />{" "}
                                    <span>
                                        {commentObj.metrics.replies} replies
                                    </span>
                                </div>
                            )}

                            <div onClick={}></div>
                            */}
                        </li>
                    )
                )}
            </ul>

            <Modal.Root
                isOpen={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                defaultIsDismissible={true}
            >
                <Modal.Content>
                    <DeleteCommentDialog
                        onYes={() => {
                            if (selectedDeleteComment === null) return;

                            // Placeholder for server-side function to delete the album
                            // const success = onCommentDelete?.(selectedDeleteComment);
                            const success = Math.round(Math.random());

                            if (success) {
                                onCommentDeleted?.(selectedDeleteComment);
                                setIsDeleteDialogOpen(false);
                                Tooltip(`Successfully deleted comment`);
                            } else {
                                Tooltip(`Error: Could not delete comment`);
                            }
                        }}
                        onNo={() => setIsDeleteDialogOpen(false)}
                    ></DeleteCommentDialog>
                </Modal.Content>
            </Modal.Root>
        </DialogCard>
    );
}
