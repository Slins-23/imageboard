import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "./IconButton";

const meta: Meta<typeof IconButton> = {
    title: "UI/Buttons/IconButton",
    component: IconButton,
};

export default meta;

export const Primary: StoryObj<typeof meta> = { args: {} };
