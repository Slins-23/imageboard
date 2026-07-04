import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof IconButton> = {
    title: "Features/Account/Buttons/Notifications",
    component: IconButton,
};

export default meta;

export const NotificationsButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "notificationsBtn",
        disabled: false,
        icon: faBell,
        hasNotifications: true,
        notificationProps: { count: 55 },
        iconSize: "30px",
    },
};
