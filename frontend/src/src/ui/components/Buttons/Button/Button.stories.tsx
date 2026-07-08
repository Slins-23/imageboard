import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button, { type DefaultButtonProps } from "./Button";

const meta: Meta<DefaultButtonProps> = {
    title: "UI/Buttons/Button",
    component: Button,
};

export default meta;

export const SaveButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "Save changes",
        children: "Save changes",
        onClick: () => alert("Changes saved!"),
        onKeyDown: (event) => {
            switch (event.key) {
                case " ":
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

export const UploadButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "Upload",
        children: "Upload",
        disabled: false,
    },
};

export const Reset: StoryObj<typeof meta> = {
    args: {
        "aria-label": "Reset",
        children: "Reset",
        disabled: false,
    },
};
