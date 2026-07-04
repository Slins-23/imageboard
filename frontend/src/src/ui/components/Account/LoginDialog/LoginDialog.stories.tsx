import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LoginDialog from "./LoginDialog";

const meta: Meta<typeof LoginDialog> = {
    title: "UI/Account/LoginDialog",
    component: LoginDialog,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {},
};
