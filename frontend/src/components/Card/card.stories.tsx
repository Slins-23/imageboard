import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Card from "./card.tsx";

const meta: Meta<typeof Card> = {
    title: "Components/Card",
    component: Card,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        interestTag: "Anime",
        interestValue: 0.95,
        width: "150px",
        height: "150px",
        fontSize: "2rem",
    },
};
