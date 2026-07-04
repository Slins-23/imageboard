import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof IconButton> = {
    title: "Features/Account/Buttons/Theme",
    component: IconButton,
};

export default meta;

export const ThemeButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "themeBtn",
        disabled: false,
        icon: faCircleHalfStroke,
    },
};
