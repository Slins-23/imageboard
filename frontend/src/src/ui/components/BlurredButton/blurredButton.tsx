import blurredButtonStyle from "./blurredButton.module.css";
import Button from "@/ui/components/Button/button";
import { ComponentProps } from "react";
import clsx from "clsx";

type ButtonProps = ComponentProps<typeof Button>;

export default function BlurredButton({ ...props }: ButtonProps) {
    return (
        <Button
            {...props}
            className={clsx(blurredButtonStyle.blurred, props.className)}
        >
            {props.children}
        </Button>
    );
}
