import { ReactNode, useState } from "react";
import DialogCard from "../DialogCard/dialogCard";
import followListStyle from "./followList.module.css";
import Image from "next/image";
import Button from "../Button/button";
import UserPlaceholder from "../UserPlaceholder/userPlaceholder";

// `followRelation` could be either `following` or `follows`
// As this component behaves the same way when displaying a list
// of user this user follows, or users that follow this user
interface User {
    avatar?: string;
    name: string;
    followed: boolean;
}

type Users = User[];

interface FollowListArgs {
    users: Users;
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
            avatar: "images/thumb/userb.jpg",
            name: "UsernameB",
            followed: true,
        },
        { avatar: undefined, name: "UsernameC", followed: false },
        {
            avatar: "images/thumb/userd.png",
            name: "UsernameD",
            followed: true,
        },
        {
            avatar: "images/thumb/usere.png",
            name: "UsernameEEEz",
            followed: false,
        },
        { avatar: undefined, name: "UsernameFFFA", followed: true },
    ],
}: FollowListArgs) {
    const followStates = [...users.map((user) => useState(user.followed))];

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
                            onClick={() => {
                                user.followed = !user.followed;
                                followStates[idx][1]((prev) => !prev);
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
