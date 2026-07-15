import { Meta, StoryObj } from "@storybook/nextjs-vite";
import DropdownMenu from "./DropdownMenu";
import { useArgs } from "storybook/preview-api";
import { SetStateAction } from "react";

const meta: Meta<typeof DropdownMenu> = {
    title: "UI/Input/DropdownMenu",
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
        fontSize: "var(--font-size-md)",
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
        fontSize: "var(--font-size-md)",
        width: "300px",
    },
    render: (args) => {
        const [, setArgs] = useArgs();
        const setSelectedIdx = (selectedIdx: SetStateAction<number>) =>
            setArgs({ selectedIdx });

        return (
            <DropdownMenu
                {...args}
                onSelectedChange={setSelectedIdx}
            />
        );
    },
};
