import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { faX } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof IconButton> = {
    title: "Features/Posts/Buttons/Close",
    component: IconButton,
};

export default meta;

export const CloseButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "closeBtn",
        disabled: false,
        icon: faX,
    },
};
