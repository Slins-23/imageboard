import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Checkbox from "@/components/Checkbox/checkbox";
import { useArgs } from "storybook/preview-api";

const meta: Meta<typeof Checkbox> = {
    title: "Components/Checkbox",
    component: Checkbox,
};

export default meta;

export const Uncontrolled: StoryObj<typeof meta> = {
    args: {
        "aria-label": "Uncontrolled",
        width: "auto",
        height: "auto",
        iconSize: "18px",
        iconWidthScale: 0.8,
        iconHeightScale: 1,
        disabled: false,
    },
};

export const Controlled: StoryObj<typeof meta> = {
    args: {
        "aria-label": "Controlled",
        isChecked: false,
        width: "auto",
        height: "auto",
        iconSize: "18px",
        iconWidthScale: 0.8,
        iconHeightScale: 1,
        disabled: false,
    },
    render: (args) => {
        const [, setArgs] = useArgs();
        const setIsChecked = (isChecked: boolean) => setArgs({ isChecked });

        return (
            <Checkbox
                {...args}
                isChecked={args.isChecked}
                onCheckedChange={setIsChecked}
            />
        );
    },
};
