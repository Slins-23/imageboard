import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import NotificationCount from "@/components/NotificationCount/notificationCount";

const meta: Meta<typeof NotificationCount> = {
    title: "Components/NotificationCount",
    component: NotificationCount,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        count: 0,
        width: "16px",
        height: "16px",
        fontSize: "8px",
    },
};
