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
        "aria-label": "Save changes",
        children: "Save changes",
        onClick: () => alert("Changes saved!"),
        onKeyDown: (event) => {
            switch (event.code) {
                case "Space":
                case "Enter": {
                    event.preventDefault();
                    alert("Changes saved! (KeyDown)");
                    break;
                }
                default: {
                    break;
                }
            }
        },
        disabled: false,
    },
};

export const UploadButton: Story = {
    args: {
        "aria-label": "Upload",
        children: "Upload",
        disabled: false,
    },
};

export const Reset: Story = {
    args: {
        "aria-label": "Reset",
        children: "Reset",
        disabled: false,
    },
};
