import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof IconButton> = {
    title: "Features/Posts/Buttons/Create",
    component: IconButton,
};

export default meta;

export const CreatePostButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "createPostBtn",
        disabled: false,
        icon: faPlus,
        iconSize: "30px",
    },
};
