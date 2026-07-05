"use client";

import buttonStyle from "./Button.module.css";
import {
    useRef,
    type ButtonHTMLAttributes,
    type MouseEvent,
    type KeyboardEvent,
    type ReactNode,
    type ComponentPropsWithoutRef,
    type ElementType,
} from "react";
import clsx from "clsx";

type ButtonProps<Component extends ElementType> = {
    as?: Component;
    children?: ReactNode;
} & ComponentPropsWithoutRef<Component>;

export default function Button<Component extends ElementType>({
    as,
    "aria-label": ariaLabel = "Save changes",
    children = "Save changes",
    ...props
}: ButtonProps<Component>) {
    const Component = as ?? "button";

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        if (props.disabled) return;

        props.onClick?.(event);

        // eslint-disable-next-line no-useless-return
        if (event.defaultPrevented) return;
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (props.disabled) return;

        props.onKeyDown?.(event);

        // eslint-disable-next-line no-useless-return
        if (event.defaultPrevented) return;

        if (
            (Component !== "button" && event.key === " ") ||
            event.key === "Enter"
        ) {
            event.preventDefault();
            event.currentTarget.click();
        }
    };

    return (
        <Component
            aria-label={ariaLabel}
            type={"button"}
            {...props}
            className={clsx(buttonStyle.button, props.className)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {/* <div style={{ position: "relative", zIndex: 1 }}>{children}</div> */}
            {children}
        </Component>
    );
}
