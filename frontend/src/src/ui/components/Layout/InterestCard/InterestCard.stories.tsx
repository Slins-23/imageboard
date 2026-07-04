import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import InterestCard from "./InterestCard.tsx";

const meta: Meta<typeof InterestCard> = {
    title: "UI/Layout/InterestCard",
    component: InterestCard,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        interestTag: "Anime",
        interestValue: 0.95,
    },
};
