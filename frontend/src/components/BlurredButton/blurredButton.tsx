import blurredButtonStyle from "./blurredButton.module.css";
import Button, { type ButtonArgs } from "@/components/Button/button";

export default function BlurredButton({
    "aria-label": ariaLabel = "Click",
    paddingH = 0.3,
    paddingV = 0.1,
    borderRadius = 10,
    fontSize = 1.5,
    ...args
}: ButtonArgs) {
    return (
        <Button
            className={`${blurredButtonStyle.blurred}`}
            aria-label={ariaLabel}
            style={{
                padding: `${paddingV}em ${paddingH}em`,
                borderRadius: `${borderRadius}px`,
                fontSize: `${fontSize}rem`,
            }}
            {...args}
        />
    );
}
