"use client";

import { type ChangeEvent, type InputHTMLAttributes } from "react";
import textBoxStyle from "@/components/TextBox/textBox.module.css";
import { useControllableState } from "@/utils/utils";

interface textBoxArgs extends InputHTMLAttributes<HTMLInputElement> {
    defaultValue?: string;
    value?: string;
    transformText?: (value: string) => string;
    onTextChange?: (value: string) => void;
    width?: string;
    height?: string;
    fontSize?: string;
    type?:
        | "date"
        | "email"
        | "number"
        | "password"
        | "search"
        | "tel"
        | "text"
        | "time"
        | "url"
        | "week";
}

export function TextBox({
    defaultValue = "",
    value = undefined,
    transformText = undefined,
    onTextChange = undefined,
    width = "auto",
    height = "2rem",
    fontSize = "1.15rem",
    type = "text",
    ...args
}: textBoxArgs) {
    const [textState, setTextState] = useControllableState<string>({
        value,
        defaultValue,
        onChange: onTextChange,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (args.disabled || event.defaultPrevented) return;

        let currentText = event.target?.value;
        if (transformText !== undefined) {
            currentText = transformText?.(currentText);
        }

        setTextState(currentText);
    };

    return (
        <input
            type={type}
            className={textBoxStyle.textBox}
            style={{ width, height, fontSize }}
            value={textState ?? ""}
            {...args}
            onChange={handleChange}
        />
    );
}
