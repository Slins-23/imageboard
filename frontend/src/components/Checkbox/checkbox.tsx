"use client";

import checkboxStyle from "./checkbox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface CheckboxArgs {
    width: string;
    height: string;
    iconSize: string;
    iconWidthScale: number;
    iconHeightScale: number;
}

export default function Checkbox({
    width = "auto",
    height = "auto",
    iconSize = "18px",
    iconWidthScale = 0.8,
    iconHeightScale = 1,
}: CheckboxArgs) {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    return (
        <div>
            <button
                type="button"
                className={`${checkboxStyle.checkbox}`}
                style={{
                    width,
                    height,
                    backgroundColor: isChecked
                        ? "var(--tertiary)"
                        : "var(--secondary)",
                }}
                onClick={() => {
                    setIsChecked(!isChecked);
                }}
            >
                <FontAwesomeIcon
                    icon={faCheck}
                    style={{
                        fontSize: iconSize,
                        scale: `${iconWidthScale} ${iconHeightScale}`,
                        color: "var(--accent)",
                        visibility: isChecked ? "visible" : "hidden",
                    }}
                />
            </button>
        </div>
    );
}
