"use client";

import buttonStyle from "./button.module.css";
import {
    useRef,
    type ButtonHTMLAttributes,
    type MouseEvent,
    type KeyboardEvent,
    type ReactNode,
} from "react";
import clsx from "clsx";

interface ButtonArgs extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}

export default function Button({
    "aria-label": ariaLabel = "Save changes",
    children = "Save changes",
    ...props
}: ButtonArgs) {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (props.disabled) return;

        props.onClick?.(event);

        // eslint-disable-next-line no-useless-return
        if (event.defaultPrevented) return;
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (props.disabled) return;

        props.onKeyDown?.(event);

        // eslint-disable-next-line no-useless-return
        if (event.defaultPrevented) return;
    };

    return (
        <button
            aria-label={ariaLabel}
            type={"button"}
            {...props}
            className={clsx(buttonStyle.button, props.className)}
            ref={buttonRef}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {/* <div style={{ position: "relative", zIndex: 1 }}>{children}</div> */}
            {children}
        </button>
    );
}
