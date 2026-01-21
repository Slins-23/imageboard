"use client";

import switchStyle from "./toggleSwitch.module.css";
import { useEffect, useRef, type KeyboardEvent } from "react";
import { useControllableState } from "@/utils/utils";

interface SwitchArgs {
    width?: string;
    height?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
    isChecked?: boolean;
    defaultChecked?: boolean;
    onToggle?: (isChecked: boolean) => void;
}

export default function ToggleSwitch({
    width = "32px",
    height = "17px",
    isDisabled = false,
    isRequired = false,
    isChecked = undefined,
    defaultChecked = false,
    onToggle = undefined,
}: SwitchArgs) {
    const [internalChecked, setInternalChecked] = useControllableState<boolean>(
        {
            value: isChecked,
            defaultValue: defaultChecked,
            onChange: onToggle,
        }
    );

    const buttonRef = useRef<HTMLDivElement | null>(null);

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
                onClick={() => setInternalChecked(!internalChecked)}
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
