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
        "aria-label": "Uncontrolled",
        width: "32px",
        height: "18px",
        disabled: false,
    },
};

export const Controlled: Story = {
    args: {
        "aria-label": "Controlled",
        width: "32px",
        height: "18px",
        isChecked: false,
        disabled: true,
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
