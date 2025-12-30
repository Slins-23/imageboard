import { Meta, StoryObj } from "@storybook/nextjs-vite";
import UserPlaceholder from "./userPlaceholder";

const meta: Meta<typeof UserPlaceholder> = {
    title: "Components/UserPlaceholder",
    component: UserPlaceholder,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        width: "200px",
        height: "200px",
        iconSize: "125px",
        iconWidthScale: 1.25,
        iconHeightScale: 1.22,
    },
};
