"use client";

import switchStyle from "./toggleSwitch.module.css";
import { useEffect, useState, useRef, type KeyboardEvent } from "react";

interface SwitchArgs {
    width?: string;
    height?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
}

export default function ToggleSwitch({
    width = "32px",
    height = "17px",
    isDisabled = false,
    isRequired = false,
}: SwitchArgs) {
    const [isChecked, setIsChecked] = useState<boolean>(false);
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
                aria-checked={isChecked}
                aria-required={isRequired}
                tabIndex={0}
                className={`${switchStyle.switch}`}
                onClick={() => setIsChecked(!isChecked)}
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
