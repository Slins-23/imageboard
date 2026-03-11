import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FollowList from "./followList";

const meta: Meta<typeof FollowList> = {
    title: "Components/FollowList",
    component: FollowList,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {};
