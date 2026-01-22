"use client";

import checkboxStyle from "./checkbox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useControllableState } from "@/utils/utils";
import { useRef, type MouseEvent, type KeyboardEvent } from "react";

interface CheckboxArgs {
    defaultChecked?: boolean;
    isChecked?: boolean;
    onChecked?: (event?: MouseEvent<HTMLButtonElement>) => void;
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
}: CheckboxArgs) {
    const checkboxRef = useRef<HTMLDivElement>(null);

    const [internalIsChecked, setInternalIsChecked] = useControllableState({
        defaultValue: defaultChecked,
        value: isChecked,
        onChange: onCheckedChange,
    });

    const handleChange = (event: MouseEvent<HTMLDivElement>) => {
        onChecked?.();

        if (event.defaultPrevented) return;

        setInternalIsChecked(!internalIsChecked);
    };

    return (
        <div>
            <div
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
                onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
                    switch (event.code) {
                        case "Space":
                        case "Enter": {
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                }}
            >
                <FontAwesomeIcon
                    icon={faCheck}
                    className={checkboxStyle.iconStyle}
                    style={{
                        fontSize: iconSize,
                        scale: `${iconWidthScale} ${iconHeightScale}`,
                        color: "var(--accent)",
                        visibility: internalIsChecked ? "visible" : "hidden",
                    }}
                />
            </div>
        </div>
    );
}
