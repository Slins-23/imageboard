import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import GradientNavbar from "@/components/GradientNavbar/gradientNavbar";

const meta: Meta<typeof GradientNavbar> = {
    title: "Components/GradientNavbar",
    component: GradientNavbar,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        title: "Account",
        items: [
            { route: "/user/settings/profile", text: "Profile" },
            { route: "/user/settings/credentials", text: "Credentials" },
            { route: "/user/settings/interests", text: "Interests" },
            { route: "/user/settings/history", text: "History" },
            {
                route: "/user/settings/linked-accounts",
                text: "Linked accounts",
            },
            { route: "/user/settings/notifications", text: "Notifications" },
            { route: "/user/settings/delete", text: "Delete" },
        ],
        listProps: { "aria-label": "list" },
    },
};
