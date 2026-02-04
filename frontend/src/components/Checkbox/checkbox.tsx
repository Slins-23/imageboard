"use client";

import checkboxStyle from "./checkbox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useControllableState, isMouseEvent } from "@/utils/utils";
import {
    useRef,
    type MouseEvent,
    type KeyboardEvent,
    type HTMLAttributes,
} from "react";

interface CheckboxArgs extends HTMLAttributes<HTMLDivElement> {
    defaultChecked?: boolean;
    isChecked?: boolean;
    onChecked?: (
        event?: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
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
    iconSize = "18px",
    iconWidthScale = 0.8,
    iconHeightScale = 1,
    ...args
}: CheckboxArgs) {
    const checkboxRef = useRef<HTMLDivElement>(null);

    const [internalIsChecked, setInternalIsChecked] = useControllableState({
        defaultValue: defaultChecked,
        value: isChecked,
        onChange: onCheckedChange,
    });

    const handleChange = (
        event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
    ) => {
        if (args["aria-disabled"] || event.defaultPrevented) return;

        if (isMouseEvent(event)) {
            setInternalIsChecked((prev) => !prev);
            args.onClick?.(event);
        } else {
            switch (event.code) {
                case "Space":
                case "Enter": {
                    setInternalIsChecked((prev) => !prev);
                    break;
                }
                default: {
                    break;
                }
            }

            args.onKeyDown?.(event);
        }

        onChecked?.(event);
    };

    return (
        <div
            {...args}
            ref={checkboxRef}
            role="checkbox"
            tabIndex={0}
            aria-checked={internalIsChecked}
            className={`${checkboxStyle.checkbox}`}
            style={{
                width,
                height,
            }}
            onClick={handleChange}
            onKeyDown={handleChange}
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
        </div>
    );
}
