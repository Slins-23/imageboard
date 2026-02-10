"use client";

import buttonStyle from "./button.module.css";
import { useRef } from "react";
import { type ButtonHTMLAttributes } from "react";

interface ButtonArgs extends ButtonHTMLAttributes<HTMLButtonElement> {
    padding?: number;
    borderRadius?: number;
    fontSize?: number;
}

export default function button({
    "aria-label": ariaLabel = "Save changes",
    padding = 0.5,
    borderRadius = 0,
    fontSize = 1.5,
    ...args
}: ButtonArgs) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <button
            {...args}
            ref={buttonRef}
            type={"button"}
            className={`${buttonStyle.button}`}
            style={{
                padding: `${padding / 2}em ${padding}em ${padding / 2}em ${padding}em`,
                borderRadius: `${borderRadius}px`,
                fontSize: `${fontSize}rem`,
            }}
            aria-label={ariaLabel}
        >
            {ariaLabel}
        </button>
    );
}
