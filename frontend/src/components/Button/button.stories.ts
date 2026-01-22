import type { Meta, StoryObj } from "@storybook/nextjs-vite";
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
        padding: 0.5,
        borderRadius: 0,
        fontSize: 1.5,
    },
};

export const UploadButton: Story = {
    args: {
        label: "Upload",
    },
};
