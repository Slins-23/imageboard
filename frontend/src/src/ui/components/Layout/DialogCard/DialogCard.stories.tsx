import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DialogCard from "./DialogCard";

const meta: Meta<typeof DialogCard> = {
    title: "UI/Layout/DialogCard",
    component: DialogCard,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        cardProps: {
            style: {
                width: 400,
                height: 400,
            },
        },
    },
};
