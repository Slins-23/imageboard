import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import UserMenu from "./UserMenu";

const meta: Meta<typeof UserMenu> = {
    title: "UI/Navigation/UserMenu",
    component: UserMenu,
};

export default meta;

export const signedIn: StoryObj<typeof meta> = {
    args: {
        items: [
            { text: "My profile", route: "/user/profile" },
            { text: "My likes", route: "/user/likes" },
            { text: "My albums", route: "/user/albums" },
            { text: "Sign out", route: "/user/signout" },
        ],
        listProps: { "aria-label": "list" },
    },
    render: (args) => {
        return (
            <UserMenu
                {...args}
                navProps={{ style: { position: "relative" } }}
            />
        );
    },
};

export const signedOut: StoryObj<typeof meta> = {
    args: {
        items: [
            { text: "Sign in", route: "/user/signin" },
            { text: "Sign up", route: "/user/signup" },
        ],
        listProps: { "aria-label": "list" },
    },
    render: (args) => {
        return (
            <UserMenu
                {...args}
                navProps={{ style: { position: "relative" } }}
            />
        );
    },
};
