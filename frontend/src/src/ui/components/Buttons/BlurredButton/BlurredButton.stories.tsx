import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BlurredButton from "./BlurredButton";
import type { DefaultButtonProps } from "@/ui/components/Buttons/Button/Button";

const meta: Meta<DefaultButtonProps> = {
    title: "UI/Buttons/BlurredButton",
    component: BlurredButton,
};

export default meta;

export const Uncontrolled: StoryObj<typeof meta> = {
    args: {
        "aria-label": "Click",
        onClick: () => alert("Clicked"),
        onKeyDown: () => alert("Changes saved! (KeyDown)"),
    },
    render: (args) => {
        return (
            <div
                style={{
                    backgroundSize: "100%",
                    backgroundImage: "url('/examples/tag.jpeg')",
                    width: "200px",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <BlurredButton {...args}>CLICK</BlurredButton>
            </div>
        );
    },
};
