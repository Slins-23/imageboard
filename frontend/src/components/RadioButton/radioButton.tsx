"use client";

import radioBtnStyle from "./radioButton.module.css";
import { type ChangeEvent, type InputHTMLAttributes } from "react";

interface RadioButtonArgs extends InputHTMLAttributes<HTMLInputElement> {
    isSelected?: boolean;
    defaultIsSelected?: boolean;
    onSelected?: (event: ChangeEvent<HTMLInputElement>) => void;
    onSelectedChange?: (value: boolean) => void;
    width?: string;
    height?: string;
}

export default function RadioButton({
    width = "1.5626rem",
    height = "1.5626rem",
    ...args
}: RadioButtonArgs) {
    return (
        <input
            className={`${radioBtnStyle.button}`}
            style={{ width, height }}
            type="radio"
            {...args}
        />
    );
}
