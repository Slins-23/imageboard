"use client";

import switchStyle from "./toggleSwitch.module.css";
import { useEffect, useRef, type KeyboardEvent } from "react";
import { useControllableState } from "@/utils/utils";
import type { MouseEvent } from "react";

interface SwitchArgs {
    isChecked?: boolean;
    defaultChecked?: boolean;
    onToggle?: (event: MouseEvent<HTMLDivElement>) => void;
    onToggleChange?: (isChecked: boolean) => void;
    width?: string;
    height?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
}

export default function ToggleSwitch({
    isChecked = undefined,
    defaultChecked = false,
    onToggle = undefined,
    onToggleChange = undefined,
    width = "32px",
    height = "17px",
    isDisabled = false,
    isRequired = false,
}: SwitchArgs) {
    const [internalChecked, setInternalChecked] = useControllableState<boolean>(
        {
            value: isChecked,
            defaultValue: defaultChecked,
            onChange: onToggleChange,
        }
    );

    const buttonRef = useRef<HTMLDivElement | null>(null);

    const handleChange = (event: MouseEvent<HTMLDivElement>) => {
        onToggle?.(event);

        if (event.defaultPrevented) return;

        setInternalChecked(!internalChecked);
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
        <div>
            <div
                ref={buttonRef}
                role="checkbox"
                aria-checked={internalChecked}
                aria-required={isRequired}
                tabIndex={0}
                className={`${switchStyle.switch}`}
                onClick={handleChange}
                onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
                    event.preventDefault();
                    switch (event.code) {
                        case "Enter":
                        case "Space": {
                            buttonRef.current?.click();
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                }}
                aria-disabled={isDisabled}
            >
                <div className={`${switchStyle.circle}`} />
            </div>
        </div>
    );
}
