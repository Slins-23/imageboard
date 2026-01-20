import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ToggleSwitch from "./toggleSwitch";

const meta: Meta<typeof ToggleSwitch> = {
    title: "Components/ToggleSwitch",
    component: ToggleSwitch,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        width: "32px",
        height: "18px",
        isDisabled: false,
    },
};
