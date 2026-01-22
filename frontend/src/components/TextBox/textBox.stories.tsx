import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextBox } from "@/components/TextBox/textBox";
import React from "react";
import { useArgs } from "storybook/preview-api";

const meta: Meta<typeof TextBox> = {
    title: "Components/TextBox",
    component: TextBox,
};

export default meta;

export const Uncontrolled: StoryObj<typeof meta> = {
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
        onInput: (event: React.ChangeEvent<HTMLInputElement>) => {
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

export const Controlled: StoryObj<typeof meta> = {
    args: {
        value: "",
        width: "auto",
        height: "32px",
        fontSize: "1.15rem",
        placeholder: undefined,
        readOnly: false,
        isDisabled: false,
        maxLength: undefined,
        required: false,
        type: "text",
        onInput: (event: React.ChangeEvent<HTMLInputElement>) => {
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
    render: (args) => {
        const [, setArgs] = useArgs();
        const setTextState = (textState: string) =>
            setArgs({ value: textState });

        return (
            <TextBox
                {...args}
                onChange={setTextState}
            />
        );
    },
};
