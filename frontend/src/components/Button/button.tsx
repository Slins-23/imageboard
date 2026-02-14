"use client";

import buttonStyle from "./button.module.css";
import {
    useRef,
    type ButtonHTMLAttributes,
    type MouseEvent,
    type KeyboardEvent,
} from "react";

export interface ButtonArgs extends ButtonHTMLAttributes<HTMLButtonElement> {
    paddingH?: number;
    paddingV?: number;
    borderRadius?: number;
    fontSize?: number;
}

export default function button({
    "aria-label": ariaLabel = "Save changes",
    paddingH = 0.5,
    paddingV = 0.25,
    borderRadius = 0,
    fontSize = 1.5,
    ...args
}: ButtonArgs) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (args.disabled) return;

        args.onClick?.(event);

        // eslint-disable-next-line no-useless-return
        if (event.defaultPrevented) return;
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (args.disabled) return;

        args.onKeyDown?.(event);

        // eslint-disable-next-line no-useless-return
        if (event.defaultPrevented) return;
    };

    return (
        <button
            aria-label={ariaLabel}
            className={`${buttonStyle.button}`}
            style={{
                padding: `${paddingV}em ${paddingH}em`,
                borderRadius: `${borderRadius}px`,
                fontSize: `${fontSize}rem`,
            }}
            type={"button"}
            {...args}
            ref={buttonRef}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <span style={{ position: "relative", zIndex: 1 }}>{ariaLabel}</span>
        </button>
    );
}
