import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import InterestCard from "./interestCard.tsx";

const meta: Meta<typeof InterestCard> = {
    title: "Components/InterestCard",
    component: InterestCard,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        interestTag: "Anime",
        interestValue: 0.95,
    },
};
