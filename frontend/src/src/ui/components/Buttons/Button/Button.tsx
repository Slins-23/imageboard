"use client";

import buttonStyle from "./Button.module.css";
import {
    type MouseEvent,
    type KeyboardEvent,
    type ReactNode,
    type ComponentPropsWithoutRef,
    type ElementType,
} from "react";
import clsx from "clsx";

export type ButtonProps<C extends ElementType = "button"> = {
    as?: C;
    children?: ReactNode;
} & ComponentPropsWithoutRef<C>;

export type DefaultButtonProps = ButtonProps<"button">;

export default function Button<C extends ElementType = "button">({
    as,
    "aria-label": ariaLabel = "Save changes",
    children = "Save changes",
    ...props
}: ButtonProps<C>) {
    const Component = (as || "button") as ElementType;

    const p = props as ComponentPropsWithoutRef<"button">;

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        if (p.disabled) return;

        p.onClick?.(event as MouseEvent<HTMLButtonElement>);

        // eslint-disable-next-line no-useless-return
        if (event.defaultPrevented) return;
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (p.disabled) return;

        p.onKeyDown?.(event as KeyboardEvent<HTMLButtonElement>);

        // eslint-disable-next-line no-useless-return
        if (event.defaultPrevented) return;

        if (
            Component !== "button" &&
            (event.key === " " || event.key === "Enter")
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
            className={clsx(buttonStyle.button, p.className)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {children}
        </Component>
    );
}
