import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Button from "@/components/Button/button";
import { fn } from "storybook/test";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
        // backgroundColor: { control: "color" },
    },
    args: { onClick: fn() },
};

export default meta;

export const DefaultValue: StoryObj<typeof meta> = {
    args: {},
};

export const TestColors: StoryObj<typeof meta> = {
    args: {
        backgroundColor: "#56ddcb",
        padding: 17,
        borderRadius: 9,
        color: "#b81a1a",
    },
};
