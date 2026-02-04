import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DropdownMenu } from "./dropdownMenu";
import { useArgs } from "storybook/preview-api";

const meta: Meta<typeof DropdownMenu> = {
    title: "Components/DropdownMenu",
    component: DropdownMenu,
};

export default meta;

export const Uncontrolled: StoryObj<typeof meta> = {
    args: {
        dropdownEntries: [
            { value: "One" },
            { value: "Two" },
            {
                value: "Three123456789123456789123456789123456789123456789aaaaaaaaaa",
                callback: () => console.log("Three clicked"),
            },
        ],
        responsive: true,
        fontSize: "1rem",
        width: "300px",
        buttonProps: {
            disabled: true,
        },
    },
};

export const Controlled: StoryObj<typeof meta> = {
    args: {
        dropdownEntries: [
            { value: "One" },
            { value: "Two" },
            {
                value: "Three123456789123456789123456789123456789123456789aaaaaaaaaa",
                callback: () => console.log("Three clicked"),
            },
        ],
        selectedIdx: 0,
        responsive: true,
        fontSize: "1rem",
        width: "300px",
    },
    render: (args) => {
        const [, setArgs] = useArgs();
        const setSelectedIdx = (selectedIdx: number) =>
            setArgs({ selectedIdx });

        return (
            <DropdownMenu
                {...args}
                onSelectedChange={setSelectedIdx}
            />
        );
    },
};
