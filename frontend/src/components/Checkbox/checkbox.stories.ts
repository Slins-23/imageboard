import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Checkbox from "@/components/Checkbox/checkbox";

const meta: Meta<typeof Checkbox> = {
    title: "Components/Checkbox",
    component: Checkbox,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        width: "auto",
        height: "auto",
        iconSize: "18px",
        iconWidthScale: 0.8,
        iconHeightScale: 1,
    },
};
