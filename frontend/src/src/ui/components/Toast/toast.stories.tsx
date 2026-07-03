import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Toast from "./toast";
import Button from "@/ui/components/Button/button";

const meta: Meta<typeof Toast> = {
    title: "Components/Toast",
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    render: () => {
        return (
            <Button onClick={() => Toast("Toast spawned")}>Spawn toast</Button>
        );
    },
};
