"use client";

import checkboxStyle from "./checkbox.module.css";
import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faCheck, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import useControllableState from "@/ui/hooks/useControllableState";
import {
    type MouseEvent,
    type KeyboardEvent,
    type ButtonHTMLAttributes,
    type Dispatch,
    type SetStateAction,
} from "react";
import clsx from "clsx";

interface CheckboxArgs extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: IconDefinition;
    iconSize: string;
    iconWidthScale?: number;
    iconHeightScale?: number;
    defaultChecked?: boolean;
    isChecked?: boolean;
    onChecked?: (
        isChecked: boolean,
        event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ) => void;
    onCheckedChange?: Dispatch<SetStateAction<boolean | undefined>>;
    iconProps?: FontAwesomeIconProps;
}

export default function Checkbox({
    icon = faCheck,
    defaultChecked = false,
    isChecked,
    onChecked,
    onCheckedChange,
    iconSize = "var(--font-size-md)",
    iconWidthScale = 0.8,
    iconHeightScale = 1,
    iconProps,
    ...props
}: CheckboxArgs) {
    const [internalIsChecked, setInternalIsChecked] = useControllableState({
        defaultValue: defaultChecked,
        value: isChecked,
        onChange: onCheckedChange,
    });

    const handleCheck = (
        event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ) => {
        const nextChecked = !internalIsChecked;

        setInternalIsChecked(nextChecked);

        onChecked?.(nextChecked, event);
    };

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (props.disabled) return;

        props.onClick?.(event);

        if (event.defaultPrevented) return;

        handleCheck(event);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (props.disabled) return;

        props.onKeyDown?.(event);

        if (event.defaultPrevented) return;

        switch (event.key) {
            case " ":
            case "Enter": {
                event.preventDefault();
                handleCheck(event);

                break;
            }
            default: {
                break;
            }
        }
    };

    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={internalIsChecked}
            {...props}
            className={clsx(checkboxStyle.checkbox, props.className)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <FontAwesomeIcon
                {...iconProps}
                icon={icon}
                className={clsx(checkboxStyle.iconStyle, iconProps?.className)}
                style={{
                    fontSize: iconSize,
                    scale: `${iconWidthScale} ${iconHeightScale}`,
                    ...iconProps?.style,
                }}
            />
        </button>
    );
}
