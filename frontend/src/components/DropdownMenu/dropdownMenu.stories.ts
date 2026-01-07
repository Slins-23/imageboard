import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DropdownMenu } from "./dropdownMenu";

const meta: Meta<typeof DropdownMenu> = {
    title: "Components/DropdownMenu",
    component: DropdownMenu,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
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
        width: "300px",
        fontSize: "1rem",
    },
};
