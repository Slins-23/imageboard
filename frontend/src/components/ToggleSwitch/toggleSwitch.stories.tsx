import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";
import ToggleSwitch from "./toggleSwitch";

const meta: Meta<typeof ToggleSwitch> = {
    title: "Components/ToggleSwitch",
    component: ToggleSwitch,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
    args: {
        width: "32px",
        height: "18px",
        isDisabled: false,
        isRequired: false,
    },
};

export const Controlled: Story = {
    args: {
        width: "32px",
        height: "18px",
        isDisabled: false,
        isChecked: false,
        isRequired: false,
    },
    render: (args) => {
        const [, setArgs] = useArgs();
        const setIsChecked = (isChecked: boolean) => setArgs({ isChecked });

        return (
            <ToggleSwitch
                {...args}
                onToggleChange={setIsChecked}
            />
        );
    },
};
