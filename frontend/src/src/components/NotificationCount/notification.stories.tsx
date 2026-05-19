import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import NotificationCount from "@/components/NotificationCount/notificationCount";

const meta: Meta<typeof NotificationCount> = {
    title: "Components/NotificationCount",
    component: NotificationCount,
};

export default meta;

export const Uncontrolled: StoryObj<typeof meta> = {
    args: {
        defaultCount: 5,
    },
};

export const Controlled: StoryObj<typeof meta> = {
    args: {
        count: 32,
    },
};
