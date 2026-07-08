import blurredButtonStyle from "./BlurredButton.module.css";
import Button, {
    type ButtonProps,
} from "@/ui/components/Buttons/Button/Button";
import type { ElementType } from "react";
import clsx from "clsx";

export default function BlurredButton<C extends ElementType = "button">({
    ...props
}: ButtonProps<C>) {
    return (
        <Button
            {...props}
            className={clsx(blurredButtonStyle.blurred, props.className)}
        >
            {props.children}
        </Button>
    );
}
