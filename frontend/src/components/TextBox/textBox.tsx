"use client";

import { type ChangeEvent } from "react";
import textBoxStyle from "@/components/TextBox/textBox.module.css";
import { useControllableState } from "@/utils/utils";

interface textBoxArgs {
    defaultValue?: string;
    value?: string;
    onInput?: (event: ChangeEvent<HTMLInputElement>) => string;
    onChange?: (newValue: string) => void;
    width?: string;
    height?: string;
    fontSize?: string;
    placeholder?: string;
    readOnly?: boolean;
    isDisabled?: boolean;
    maxLength?: number;
    required?: boolean;
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
    onInput = undefined,
    onChange = undefined,
    width = "auto",
    height = "32px",
    fontSize = "1.15rem",
    placeholder = undefined,
    readOnly = false,
    isDisabled = false,
    maxLength = undefined,
    required = false,
    type = "text",
}: textBoxArgs) {
    const [textState, setTextState] = useControllableState({
        value,
        defaultValue,
        onChange,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.defaultPrevented) return;

        if (onInput === undefined) {
            setTextState((event.target as HTMLInputElement)?.value);
        } else {
            const parsedContent = onInput(event);
            // event.target.value = parsedContent;
            setTextState(parsedContent);
        }
    };

    return (
        <input
            type={type}
            className={textBoxStyle.textBox}
            style={{ width, height, fontSize }}
            onChange={handleChange}
            disabled={isDisabled}
            readOnly={readOnly}
            placeholder={placeholder}
            maxLength={maxLength}
            required={required}
            value={textState}
        />
    );
}
