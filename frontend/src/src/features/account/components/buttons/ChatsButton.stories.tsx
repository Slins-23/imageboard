import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof IconButton> = {
    title: "Features/Account/Buttons/Chats",
    component: IconButton,
};

export default meta;

export const ChatsButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "chatsBtn",
        disabled: false,
        icon: faMessage,
        hasNotifications: true,
        notificationProps: { count: 32 },
    },
};
