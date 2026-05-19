import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FollowList from "./followList";
import Tooltip from "../Tooltip/tooltip";
import { User, Users } from "./types";

const meta: Meta<typeof FollowList> = {
    title: "Components/FollowList",
    component: FollowList,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        onFollowed: (user: User) =>
            Tooltip(`Successfully followed user ${user.name}`),
        onUnfollowed: (user: User) =>
            Tooltip(`Successfully unfollowed user ${user.name}`),
    },
};
