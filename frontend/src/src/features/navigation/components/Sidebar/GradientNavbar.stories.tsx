import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import GradientNavbar from "./GradientNavbar";
import Toast from "@/ui/components/Overlays/Toast/toast";

const meta: Meta<typeof GradientNavbar> = {
    title: "Features/Navigation/GradientNavbar",
    component: GradientNavbar,
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
