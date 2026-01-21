import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ToggleSwitch from "./toggleSwitch";
import { useState } from "react";

const meta: Meta<typeof ToggleSwitch> = {
    title: "Components/ToggleSwitch",
    component: ToggleSwitch,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        width: "32px",
        height: "18px",
        isDisabled: false,
        defaultChecked: false,
    },
};

export const Controlled: Story = {
    render: () => {
        const [isChecked, setIsChecked] = useState<boolean>(false);

        return (
            <ToggleSwitch
                isChecked={isChecked}
                onToggle={setIsChecked}
            />
        );
    },
};

export const Uncontrolled: Story = {
    render: () => {
        return <ToggleSwitch defaultChecked={false} />;
    },
};
