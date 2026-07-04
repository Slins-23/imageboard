import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import UserMenu from "./UserMenu";
import Toast from "@/ui/components/Overlays/Toast/toast";

const meta: Meta<typeof UserMenu> = {
    title: "Features/Navigation/UserMenu",
    component: UserMenu,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        onCreate: () => Toast("Create clicked!"),
    },
    parameters: {
        nextjs: {
            navigation: {
                pathname: "/",
            },
        },
    },
};
