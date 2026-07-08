import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FollowList from "./FollowList";
import Toast from "@/ui/components/Overlays/Toast/toast";

const meta: Meta<typeof FollowList> = {
    title: "UI/Account/FollowList",
    component: FollowList,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        onFollowed: (user) => Toast(`Successfully followed user ${user.name}`),
        onUnfollowed: (user) =>
            Toast(`Successfully unfollowed user ${user.name}`),
    },
};
