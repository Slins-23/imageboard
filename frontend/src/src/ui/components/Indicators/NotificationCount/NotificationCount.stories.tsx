import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import NotificationCount from "@/ui/components/Indicators/NotificationCount/NotificationCount";

const meta: Meta<typeof NotificationCount> = {
    title: "UI/Indicators/NotificationCount",
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
