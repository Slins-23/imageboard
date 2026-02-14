"use client";

import checkboxStyle from "./checkbox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useControllableState } from "@/utils/utils";
import {
    useRef,
    type MouseEvent,
    type KeyboardEvent,
    ButtonHTMLAttributes,
} from "react";

interface CheckboxArgs extends ButtonHTMLAttributes<HTMLButtonElement> {
    defaultChecked?: boolean;
    isChecked?: boolean;
    onChecked?: (
        event?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ) => void;
    onCheckedChange?: (isChecked: boolean) => void;
    width: string;
    height: string;
    iconSize: string;
    iconWidthScale: number;
    iconHeightScale: number;
}

export default function Checkbox({
    defaultChecked = false,
    isChecked = undefined,
    onChecked = undefined,
    onCheckedChange = undefined,
    width = "auto",
    height = "auto",
    iconSize = "1.125rem",
    iconWidthScale = 0.8,
    iconHeightScale = 1,
    ...args
}: CheckboxArgs) {
    const checkboxRef = useRef<HTMLButtonElement>(null);

    const [internalIsChecked, setInternalIsChecked] = useControllableState({
        defaultValue: defaultChecked,
        value: isChecked,
        onChange: onCheckedChange,
    });

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (args.disabled) return;

        args.onClick?.(event);

        if (event.defaultPrevented) return;

        setInternalIsChecked((prev) => !prev);

        onChecked?.(event);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (args.disabled) return;

        args.onKeyDown?.(event);

        if (event.defaultPrevented) return;

        switch (event.code) {
            case "Space":
            case "Enter": {
                event.preventDefault();
                setInternalIsChecked((prev) => !prev);
                break;
            }
            default: {
                break;
            }
        }

        onChecked?.(event);
    };

    return (
        <button
            className={`${checkboxStyle.checkbox}`}
            style={{
                width,
                height,
            }}
            role="checkbox"
            aria-checked={internalIsChecked}
            {...args}
            ref={checkboxRef}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <FontAwesomeIcon
                icon={faCheck}
                className={checkboxStyle.iconStyle}
                style={{
                    fontSize: iconSize,
                    scale: `${iconWidthScale} ${iconHeightScale}`,
                    color: "var(--accent)",
                    // visibility: internalIsChecked ? "visible" : "hidden",
                    opacity: internalIsChecked ? "1" : "0",
                }}
            />
        </button>
    );
}
