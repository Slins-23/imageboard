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
    },
};

export const Controlled: Story = {
    args: {
        width: "32px",
        height: "18px",
        isChecked: false,
        "aria-disabled": true,
    },
    render: (args) => {
        const [, setArgs] = useArgs();
        const setIsChecked = (isChecked: boolean) => setArgs({ isChecked });

        return (
            <ToggleSwitch
                {...args}
                onCheckedChange={setIsChecked}
                onClick={() => alert(`Is checked (click)? ${args.isChecked}`)}
                onKeyDown={() =>
                    alert(`Is checked (keydown)? ${args.isChecked}`)
                }
            />
        );
    },
};
