"use client";

import { type ChangeEvent, type InputHTMLAttributes } from "react";
import textBoxStyle from "@/components/TextBox/textBox.module.css";
import { useControllableState } from "@/utils/utils";

interface textBoxArgs extends InputHTMLAttributes<HTMLInputElement> {
    defaultValue?: string;
    value?: string;
    transformText?: (value: string) => string;
    onTextChange?: (value: string) => void;
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

export default function TextBox({
    defaultValue = "",
    value = undefined,
    transformText = undefined,
    onTextChange = undefined,
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
            value={textState ?? ""}
            {...args}
            onChange={handleChange}
        />
    );
}
