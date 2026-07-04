import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { faTags } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof IconButton> = {
    title: "Features/Navigation/Buttons/Tags",
    component: IconButton,
};

export default meta;

export const TagsButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "tagsBtn",
        disabled: false,
        icon: faTags,
        iconSize: "28px",
    },
};
