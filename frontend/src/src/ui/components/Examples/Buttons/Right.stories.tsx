import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof IconButton> = {
    title: "Features/Account/Buttons/User",
    component: IconButton,
};

export default meta;

export const RightButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "rightBtn",
        disabled: false,
        icon: faArrowRight,
    },
};
