"use client";

import checkboxStyle from "./checkbox.module.css";
import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useControllableState } from "@/utils/utils";
import {
    useRef,
    type MouseEvent,
    type KeyboardEvent,
    ButtonHTMLAttributes,
} from "react";

interface CheckboxArgs extends ButtonHTMLAttributes<HTMLButtonElement> {
    iconSize: string;
    iconWidthScale?: number;
    iconHeightScale?: number;
    defaultChecked?: boolean;
    isChecked?: boolean;
    onChecked?: (
        event?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ) => void;
    onCheckedChange?: (isChecked: boolean) => void;
    iconProps?: FontAwesomeIconProps;
}

export default function Checkbox({
    defaultChecked = false,
    isChecked = undefined,
    onChecked = undefined,
    onCheckedChange = undefined,
    iconSize = "var(--font-size-md)",
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
            className={checkboxStyle.checkbox}
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
                {...args?.iconProps}
                style={{
                    fontSize: iconSize,
                    scale: `${iconWidthScale} ${iconHeightScale}`,
                    ...args?.iconProps?.style,
                }}
            />
        </button>
    );
}
