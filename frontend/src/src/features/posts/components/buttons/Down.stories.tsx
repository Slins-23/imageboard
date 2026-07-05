import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof IconButton> = {
    title: "Features/Posts/Buttons/Down",
    component: IconButton,
};

export default meta;

export const DownButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "downBtn",
        disabled: false,
        icon: faAngleDown,
        iconSize: "30px",
        iconWidthScale: 1,
        iconHeightScale: 1.25,
    },
};
