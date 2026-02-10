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
        "aria-label": "Uncontrolled",
        width: "310px",
        height: "130px",
        fontSize: "1.15rem",
        placeholder: undefined,
        readOnly: false,
        disabled: false,
        maxLength: 255,
        required: false,
        resize: "none",
        scrollable: true,
        responsive: true,
        transformText: (text: string) => {
            return text
                .replaceAll("a", "1")
                .replaceAll("e", "2")
                .replaceAll("i", "3")
                .replaceAll("o", "4")
                .replaceAll("u", "5");
        },
    },
};

export const Controlled: StoryObj<typeof meta> = {
    args: {
        "aria-label": "Controlled",
        value: "Hello... Starting value",
        width: "310px",
        height: "130px",
        fontSize: "1.15rem",
        placeholder: undefined,
        readOnly: false,
        disabled: false,
        maxLength: 255,
        required: false,
        resize: "none",
        scrollable: true,
        responsive: false,
        transformText: (text: string) => {
            return text
                .replaceAll("a", "1")
                .replaceAll("e", "2")
                .replaceAll("i", "3")
                .replaceAll("o", "4")
                .replaceAll("u", "5");
        },
    },
    render: (args) => {
        const [, setArgs] = useArgs();
        const setTextState = (text: string) => setArgs({ value: text });

        return (
            <TextArea
                {...args}
                onTextChange={setTextState}
            />
        );
    },
};
