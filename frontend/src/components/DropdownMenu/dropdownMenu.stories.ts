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
            { value: "Three", callback: () => console.log("Three clicked") },
        ],
    },
};
