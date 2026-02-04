"use client";

import switchStyle from "./toggleSwitch.module.css";
import {
    useEffect,
    useRef,
    type MouseEvent,
    type KeyboardEvent,
    type HTMLAttributes,
} from "react";
import { useControllableState } from "@/utils/utils";

interface SwitchArgs extends HTMLAttributes<HTMLDivElement> {
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
    width = "32px",
    height = "17px",
    ...args
}: SwitchArgs) {
    const [internalChecked, setInternalChecked] = useControllableState<boolean>(
        {
            value: isChecked,
            defaultValue: defaultChecked,
            onChange: onCheckedChange,
        }
    );

    const buttonRef = useRef<HTMLDivElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        if (args["aria-disabled"] || event.defaultPrevented) return;

        setInternalChecked((prev) => !prev);

        args.onClick?.(event);
    };

    const handleKeydown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (args["aria-disabled"]) return;

        switch (event.code) {
            case "Enter":
            case "Space": {
                // buttonRef.current?.click();
                event.preventDefault();
                setInternalChecked((prev) => !prev);
                // event.preventDefault();
                break;
            }
            default: {
                break;
            }
        }

        args.onKeyDown?.(event);
    };

    useEffect(() => {
        const buttonEl: HTMLDivElement | null = buttonRef.current;

        if (!buttonEl) return undefined;

        buttonEl.style.setProperty("--switch-width", width);
        buttonEl.style.setProperty("--switch-height", height);
        // buttonEl.style.setProperty("--circle-radius", height);

        return undefined;
    }, [width, height]);

    return (
        <div
            {...args}
            ref={buttonRef}
            role="switch"
            aria-checked={internalChecked}
            tabIndex={args["aria-disabled"] ? -1 : 0}
            className={`${switchStyle.switch}`}
            onClick={handleClick}
            onKeyDown={handleKeydown}
        >
            <div className={`${switchStyle.circle}`} />
        </div>
    );
}
