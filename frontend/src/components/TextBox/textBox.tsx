import React, { useRef, useCallback } from "react";
import textBoxStyle from "@/components/TextBox/textBox.module.css";

interface textBoxArgs {
    width?: string;
    height?: string;
    fontSize?: string;
    placeholder?: string;
    handleInput?: (event: React.ChangeEvent<HTMLInputElement>) => string;
    readOnly?: boolean;
    isDisabled?: boolean;
    maxLength?: number;
    required?: boolean;
}

export function TextBox({
    width = "190px",
    height = "32px",
    fontSize = "1.15rem",
    placeholder = undefined,
    handleInput = undefined,
    readOnly = false,
    isDisabled = false,
    maxLength = undefined,
    required = false,
}: textBoxArgs) {
    const inputText = useRef<string | undefined>(undefined);

    const onInput = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (handleInput === undefined) {
                inputText.current = (event.target as HTMLInputElement)?.value;
            } else {
                inputText.current = handleInput(event);
                event.target.value = inputText.current;
            }
        },
        []
    );

    return (
        <input
            type="text"
            className={textBoxStyle.textBox}
            style={{ width, height, fontSize }}
            onInput={onInput}
            disabled={isDisabled}
            readOnly={readOnly}
            placeholder={placeholder}
            maxLength={maxLength}
            required={required}
        />
    );
}
