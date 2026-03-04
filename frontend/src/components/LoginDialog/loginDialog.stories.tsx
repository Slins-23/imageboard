import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LoginDialog from "./loginDialog";

const meta: Meta<typeof LoginDialog> = {
    title: "Components/LoginDialog",
    component: LoginDialog,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {},
};
