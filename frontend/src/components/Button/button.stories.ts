import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import Button from "./button.tsx";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SaveButton: Story = {
    args: {
        label: "Save changes",
        onClick: fn(),
    },
};

export const UploadButton: Story = {
    args: {
        label: "Upload",
    },
};
