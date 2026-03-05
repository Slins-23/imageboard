import blurredButtonStyle from "./blurredButton.module.css";
import Button from "@/components/Button/button";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof Button>;

export default function BlurredButton({ ...args }: ButtonProps) {
    return (
        <Button
            className={blurredButtonStyle.blurred}
            {...args}
        >
            {args.children}
        </Button>
    );
}
