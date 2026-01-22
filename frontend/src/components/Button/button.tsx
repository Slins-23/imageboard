import buttonStyle from "./button.module.css";
import type { MouseEvent } from "react";

interface ButtonArgs {
    label: string;
    padding?: number;
    borderRadius?: number;
    fontSize?: number;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function button({
    label = "Save changes",
    padding = 0.5,
    borderRadius = 0,
    fontSize = 1.5,
    ...properties
}: ButtonArgs) {
    return (
        <button
            type={"button"}
            className={`${buttonStyle.button}`}
            style={{
                padding: `${padding / 2}em ${padding}em ${padding / 2}em ${padding}em`,
                borderRadius: `${borderRadius}px`,
                fontSize: `${fontSize}rem`,
            }}
            {...properties}
        >
            {label}
        </button>
    );
}
