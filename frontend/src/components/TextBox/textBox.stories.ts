import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextBox } from "@/components/TextBox/textBox";
import React from "react";

const meta: Meta<typeof TextBox> = {
    title: "Components/TextBox",
    component: TextBox,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        width: "auto",
        height: "32px",
        fontSize: "1.15rem",
        placeholder: undefined,
        readOnly: false,
        isDisabled: false,
        maxLength: undefined,
        required: false,
        type: "text",
        handleInput: (event: React.ChangeEvent<HTMLInputElement>) => {
            const initialValue: string = event.target.value;
            const sanitizedValue: string = initialValue
                .replaceAll("a", "1")
                .replaceAll("e", "2")
                .replaceAll("i", "3")
                .replaceAll("o", "4")
                .replaceAll("u", "5");

            return sanitizedValue;
        },
    },
};
