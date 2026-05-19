"use client";

import switchStyle from "./toggleSwitch.module.css";
import {
    useEffect,
    useRef,
    type MouseEvent,
    type KeyboardEvent,
    type ButtonHTMLAttributes,
} from "react";
import { useControllableState } from "@/utils/utils";

interface SwitchArgs extends ButtonHTMLAttributes<HTMLButtonElement> {
    isChecked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (isChecked: boolean) => void;
    width?: string;
    height?: string;
}

export default function ToggleSwitch({
    isChecked = undefined,
    defaultChecked = false,
    onCheckedChange = undefined,
    width = "var(--font-size-2xl)",
    height = "var(--font-size-md)",
    ...args
}: SwitchArgs) {
    const [internalChecked, setInternalChecked] = useControllableState<boolean>(
        {
            value: isChecked,
            defaultValue: defaultChecked,
            onChange: onCheckedChange,
        }
    );

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (args.disabled) return;

        args.onClick?.(event);

        if (event.defaultPrevented) return;

        setInternalChecked((prev) => !prev);
    };

    const handleKeydown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (args.disabled) return;

        args.onKeyDown?.(event);

        if (event.defaultPrevented) return;

        switch (event.code) {
            case "Enter":
            case "Space": {
                event.preventDefault();
                setInternalChecked((prev) => !prev);
                break;
            }
            default: {
                break;
            }
        }
    };

    useEffect(() => {
        const buttonEl: HTMLButtonElement | null = buttonRef.current;

        if (!buttonEl) return undefined;

        buttonEl.style.setProperty("--switch-width", width);
        buttonEl.style.setProperty("--switch-height", height);
        // buttonEl.style.setProperty("--circle-radius", height);

        return undefined;
    }, [width, height]);

    return (
        <button
            role="switch"
            aria-checked={internalChecked}
            className={switchStyle.switch}
            {...args}
            ref={buttonRef}
            onClick={handleClick}
            onKeyDown={handleKeydown}
        >
            <div className={switchStyle.circle} />
        </button>
    );
}
