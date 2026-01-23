import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TextArea from "@/components/TextArea/textArea";
import { useArgs } from "storybook/preview-api";

const meta: Meta<typeof TextArea> = {
    title: "Components/TextArea",
    component: TextArea,
};

export default meta;

export const Uncontrolled: StoryObj<typeof meta> = {
    args: {
        width: "310px",
        height: "130px",
        fontSize: "1.15rem",
        placeholder: undefined,
        readOnly: false,
        isDisabled: false,
        maxLength: 255,
        required: false,
        resize: "none",
        scrollable: true,
        responsive: true,
        onInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        value: "Hello... Starting value",
        width: "310px",
        height: "130px",
        fontSize: "1.15rem",
        placeholder: undefined,
        readOnly: false,
        isDisabled: false,
        maxLength: 255,
        required: false,
        resize: "none",
        scrollable: true,
        responsive: false,
        onInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        const setTextState = (text: string) => setArgs({ value: text });

        return (
            <TextArea
                {...args}
                onChange={setTextState}
            />
        );
    },
};
