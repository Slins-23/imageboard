import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Checkbox from "./Checkbox";
import { useArgs } from "storybook/preview-api";
import type { Dispatch, SetStateAction } from "react";

const meta: Meta<typeof Checkbox> = {
    title: "UI/Input/Checkbox",
    component: Checkbox,
};

export default meta;

export const Uncontrolled: StoryObj<typeof meta> = {
    args: {
        "aria-label": "Uncontrolled",
        iconSize: "var(--font-size-md)",
        iconWidthScale: 0.8,
        iconHeightScale: 1,
        disabled: false,
    },
};

export const Controlled: StoryObj<typeof meta> = {
    args: {
        "aria-label": "Controlled",
        isChecked: false,
        iconSize: "var(--font-size-md)",
        iconWidthScale: 0.8,
        iconHeightScale: 1,
        disabled: false,
    },
    render: (args) => {
        const [, setArgs] = useArgs();
        const setIsChecked: Dispatch<SetStateAction<boolean | undefined>> = (
            isChecked: SetStateAction<boolean | undefined>
        ) => setArgs({ isChecked });

        return (
            <Checkbox
                {...args}
                onCheckedChange={setIsChecked}
            />
        );
    },
};
