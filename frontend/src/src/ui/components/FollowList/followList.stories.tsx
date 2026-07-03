import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FollowList from "./followList";
import Toast from "../Toast/toast";
import { User, Users } from "./types";

const meta: Meta<typeof FollowList> = {
    title: "Components/FollowList",
    component: FollowList,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        onFollowed: (user: User) =>
            Toast(`Successfully followed user ${user.name}`),
        onUnfollowed: (user: User) =>
            Toast(`Successfully unfollowed user ${user.name}`),
    },
};
