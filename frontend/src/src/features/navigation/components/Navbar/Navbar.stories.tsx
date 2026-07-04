import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Navbar from "./Navbar";
import Toast from "@/ui/components/Overlays/Toast/toast";

const meta: Meta<typeof Navbar> = {
    title: "Features/Navigation/Navbar",
    component: Navbar,
};

export default meta;

export const Home: StoryObj<typeof meta> = {
    args: {
        onCreate: () => Toast("Create clicked!"),
    },
    parameters: {
        nextjs: {
            navigation: {
                pathname: "/",
            },
        },
        layout: "fullscreen",
    },
};

export const Tags: StoryObj<typeof meta> = {
    args: {
        onCreate: () => Toast("Create clicked!"),
    },
    parameters: {
        nextjs: {
            navigation: {
                pathname: "/tags",
            },
        },
        layout: "fullscreen",
    },
};

export const Settings: StoryObj<typeof meta> = {
    args: {
        onCreate: () => Toast("Create clicked!"),
    },
    parameters: {
        nextjs: {
            navigation: {
                pathname: "/user/settings",
            },
        },
        layout: "fullscreen",
    },
};
