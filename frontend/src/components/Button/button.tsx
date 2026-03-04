"use client";

import buttonStyle from "./button.module.css";
import {
    useRef,
    type ButtonHTMLAttributes,
    type MouseEvent,
    type KeyboardEvent,
    type ReactNode,
} from "react";

interface ButtonArgs extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}

export default function Button({
    "aria-label": ariaLabel = "Save changes",
    children = "Save changes",
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
            type={"button"}
            {...args}
            ref={buttonRef}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
        </button>
    );
}
