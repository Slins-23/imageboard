import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TextArea from "@/components/TextArea/textArea";

const meta: Meta<typeof TextArea> = {
    title: "Components/TextArea",
    component: TextArea,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        handleInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
