import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof IconButton> = {
    title: "Features/Posts/Buttons/View",
    component: IconButton,
};

export default meta;

export const ViewButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "viewBtn",
        disabled: false,
        icon: faEye,
    },
};
