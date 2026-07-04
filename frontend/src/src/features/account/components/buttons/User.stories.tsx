import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof IconButton> = {
    title: "Features/Account/Buttons/User",
    component: IconButton,
};

export default meta;

export const UserButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "userBtn",
        disabled: false,
        icon: faUser,
        iconWidthScale: 1.15,
        iconHeightScale: 1.15,
    },
};
