import {
    ReactNode,
    useRef,
    useState,
    type KeyboardEvent,
    type MouseEvent,
} from "react";
import DialogCard from "@/components/DialogCard/dialogCard";
import followListStyle from "./followList.module.css";
import Image from "next/image";
import Button from "@/components/Button/button";
import UserPlaceholder from "@/components/UserPlaceholder/userPlaceholder";
import Tooltip from "../Tooltip/tooltip";
import { User, Users } from "./types";

interface FollowListArgs {
    users: Users;
    onFollow?: (user: User) => boolean;
    onUnfollow?: (user: User) => boolean;
    onFollowed?: (user: User) => void;
    onUnfollowed?: (user: User) => void;
    children?: ReactNode;
}

export default function FollowList({
    users = [
        {
            avatar: undefined,
            name: "UsernameAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            followed: true,
        },
        {
            avatar: "/images/thumb/userb.jpg",
            name: "UsernameB",
            followed: true,
        },
        { avatar: undefined, name: "UsernameC", followed: false },
        {
            avatar: "/images/thumb/userd.png",
            name: "UsernameD",
            followed: true,
        },
        {
            avatar: "/images/thumb/usere.png",
            name: "UsernameEEEz",
            followed: false,
        },
        { avatar: undefined, name: "UsernameFFFA", followed: true },
    ],
    onFollow,
    onUnfollow,
    onFollowed,
    onUnfollowed,
}: FollowListArgs) {
    const followStates = [...users.map((user) => useState(user.followed))];

    const debouncedFollowDelayMS = 1000;
    const followTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleFollow = (
        event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
        user: User,
        idx: number
    ) => {
        const nextValue = !followStates[idx][0];

        followStates[idx][1](nextValue);
        user.followed = nextValue;

        if (followTimerRef.current) clearTimeout(followTimerRef.current);

        followTimerRef.current = setTimeout(() => {
            // Placeholder for result of server-side function for either following or unfollowing
            /*const success = nextValue
                                        ? onFollow?.(user)
                                        : onUnfollow?.(user);*/
            const success = Math.round(Math.random());

            if (success) {
                if (nextValue) onFollowed?.(user);
                else onUnfollowed?.(user);
            } else {
                followStates[idx][1](!nextValue);
                user.followed = !nextValue;
                Tooltip(
                    `Error: Could not ${nextValue ? "follow" : "unfollow"} user ${user.name}`
                );
            }
        }, debouncedFollowDelayMS);
    };

    return (
        <DialogCard
            wrapperArgs={{
                className: "",
                style: {
                    padding: "0 0",
                    width: "450px",
                    height: "250px",
                },
            }}
            cardProps={{
                style: {
                    padding: "0",
                },
            }}
        >
            <ul className={followListStyle.list}>
                {users.map((user: User, idx: number) => (
                    <li
                        key={user.name}
                        className={followListStyle.user}
                    >
                        <div className={followListStyle.avatarWrapper}>
                            {user.avatar === undefined ? (
                                <UserPlaceholder
                                    cardProps={{
                                        style: {
                                            padding: "0",
                                        },
                                    }}
                                    size="50px"
                                    iconWidthScale={1.05}
                                    iconHeightScale={1.05}
                                />
                            ) : (
                                <Image
                                    className={followListStyle.avatarWrapper}
                                    src={user.avatar}
                                    alt={user.name}
                                    width={50}
                                    height={50}
                                />
                            )}
                        </div>

                        <span className={followListStyle.username}>
                            {user.name}
                        </span>

                        <Button
                            onClick={(event) => handleFollow(event, user, idx)}
                            onKeyDown={(
                                event: KeyboardEvent<HTMLButtonElement>
                            ) => {
                                switch (event.code) {
                                    case "Space":
                                    case "Enter": {
                                        event.stopPropagation();
                                        event.preventDefault();

                                        handleFollow(event, user, idx);
                                        break;
                                    }
                                    default: {
                                        break;
                                    }
                                }
                            }}
                            style={{
                                flexShrink: "0",
                                marginLeft: "auto",
                                borderRadius: "5px",
                                padding: "0.3em 0.1em",
                                width: "9ch",
                                transitionDuration: "0.15s",
                                fontSize: "var(--font-size-lg)",
                            }}
                        >
                            {followStates[idx][0] ? "Following" : "Follow"}
                        </Button>
                    </li>
                ))}
            </ul>
        </DialogCard>
    );
}
