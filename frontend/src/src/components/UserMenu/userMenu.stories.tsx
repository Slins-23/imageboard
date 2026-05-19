import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import UserMenu from "./userMenu";

const meta: Meta<typeof UserMenu> = {
    title: "Components/UserMenu",
    component: UserMenu,
};

export default meta;

export const LoggedIn: StoryObj<typeof meta> = {
    args: {
        items: [
            { text: "My profile", route: "/user/profile" },
            { text: "My likes", route: "/user/likes" },
            { text: "My albums", route: "/user/albums" },
            { text: "Log out", route: "/user/logout" },
        ],
        listProps: { "aria-label": "list" },
    },
};

export const LoggedOut: StoryObj<typeof meta> = {
    args: {
        items: [
            { text: "Log in", route: "/user/login" },
            { text: "Sign up", route: "/user/signup" },
        ],
        listProps: { "aria-label": "list" },
    },
};
