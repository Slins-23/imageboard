import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import UserMenu from "./userMenu";

const meta: Meta<typeof UserMenu> = {
    title: "Components/UserMenu",
    component: UserMenu,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        items: [
            { text: "My profile", route: "/user/profile" },
            { text: "My likes", route: "/user/likes" },
            { text: "My albums", route: "/user/albums" },
            { text: "Logout", route: "/user/logout" },
        ],
        listProps: { "aria-label": "list" },
    },
};
