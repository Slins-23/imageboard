import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TextBox from "@/components/TextBox/textBox";
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
        "aria-placeholder": undefined,
        "aria-readonly": false,
        "aria-label": "Uncontrolled",
        disabled: false,
        maxLength: undefined,
        required: false,
        type: "text",
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
        value: "This is controlled",
        width: "auto",
        height: "32px",
        fontSize: "1.15rem",
        "aria-placeholder": undefined,
        "aria-readonly": false,
        "aria-label": "Controlled",
        disabled: false,
        maxLength: undefined,
        required: false,
        type: "text",
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
        const setTextState = (textState: string) =>
            setArgs({ value: textState });
        return (
            <TextBox
                {...args}
                onTextChange={setTextState}
            />
        );
    },
};
