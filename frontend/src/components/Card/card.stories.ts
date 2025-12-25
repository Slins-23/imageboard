import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Card from "./card.tsx";

const meta: Meta<typeof Card> = {
    title: "Components/Card",
    tags: ["autodocs"],
    component: Card,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {};
