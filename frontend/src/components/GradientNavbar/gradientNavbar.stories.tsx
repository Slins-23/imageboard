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
            { route: "/user/profile", text: "Profile" },
            { route: "/user/credentials", text: "Credentials" },
            { route: "/user/interests", text: "Interests" },
            { route: "/user/history", text: "History" },
            { route: "/user/linked-accounts", text: "Linked accounts" },
            { route: "/user/notifications", text: "Notifications" },
            { route: "/user/delete", text: "Delete" },
        ],
        listProps: { "aria-label": "list" },
    },
};
