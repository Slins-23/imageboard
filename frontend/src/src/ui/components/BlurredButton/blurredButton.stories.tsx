import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BlurredButton from "./blurredButton";

const meta: Meta<typeof BlurredButton> = {
    title: "Components/BlurredButton",
    component: BlurredButton,
};

export default meta;

export const Uncontrolled: StoryObj<typeof meta> = {
    args: {
        "aria-label": "Click",
        onClick: () => alert("Clicked"),
        onKeyDown: (event) => {
            switch (event.key) {
                case " ":
                case "Enter": {
                    event.preventDefault();
                    alert("Changes saved! (KeyDown)");
                    break;
                }
                default: {
                    break;
                }
            }
        },
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
