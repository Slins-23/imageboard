import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof IconButton> = {
    title: "Features/Account/Buttons/User",
    component: IconButton,
};

export default meta;

export const LeftButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "leftBtn",
        disabled: false,
        icon: faArrowLeft,
    },
};
