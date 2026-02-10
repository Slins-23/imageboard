import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import RadioButton from "./radioButton";
import { useArgs } from "storybook/internal/preview-api";

const meta: Meta<typeof RadioButton> = {
    title: "Components/RadioButton",
    component: RadioButton,
};

export default meta;

export const Uncontrolled: StoryObj<typeof meta> = {
    args: {
        "aria-label": "Uncontrolled",
        name: "uncontrolled",
        value: "uncontrolled-1",
        defaultIsSelected: false,
    },
};

export const Controlled: StoryObj<typeof meta> = {
    args: {
        "aria-label": "Controlled",
        name: "controlled",
        value: "controlled-1",
        isSelected: false,
        defaultIsSelected: false,
    },
    render: (args) => {
        const [, setArgs] = useArgs();
        const setIsSelected = (isSelected: boolean) => setArgs({ isSelected });

        return (
            <RadioButton
                {...args}
                onSelectedChange={setIsSelected}
            />
        );
    },
};
