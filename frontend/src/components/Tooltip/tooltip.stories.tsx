import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Tooltip from "./tooltip";
import Button from "@/components/Button/button";

const meta: Meta<typeof Tooltip> = {
    title: "Components/Tooltip",
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    render: () => {
        return (
            <Button onClick={() => Tooltip("Tooltip spawned", 30000)}>
                Spawn tooltip
            </Button>
        );
    },
};
