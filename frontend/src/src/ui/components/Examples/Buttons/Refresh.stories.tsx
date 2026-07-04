import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof IconButton> = {
    title: "Features/Account/Buttons/User",
    component: IconButton,
};

export default meta;

export const RefreshButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "refreshBtn",
        disabled: false,
        icon: faRefresh,
    },
};
