import React, { useRef, useCallback } from "react";
import textAreaStyle from "./textArea.module.css";

interface textAreaArgs {
    width?: string;
    height?: string;
    fontSize?: string;
    placeholder?: string;
    handleInput?: (event: React.ChangeEvent<HTMLTextAreaElement>) => string;
    readOnly?: boolean;
    isDisabled?: boolean;
    maxLength?: number;
    required?: boolean;
    resize?: "none" | "both" | "vertical" | "horizontal";
    scrollable?: boolean;
}

export default function TextArea({
    width = "310px",
    height = "130px",
    fontSize = "1.15rem",
    placeholder = undefined,
    handleInput = undefined,
    readOnly = false,
    isDisabled = false,
    maxLength = 255,
    required = false,
    resize = "none",
    scrollable = true,
}: textAreaArgs) {
    const inputText = useRef<string | null>(undefined);

    const onInput = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (handleInput === undefined) {
                inputText.current = (
                    event.target as HTMLTextAreaElement
                )?.value;
            } else {
                inputText.current = handleInput(event);
                event.target.value = inputText.current;
            }
        },
        []
    );

    return (
        <textarea
            className={textAreaStyle.textArea}
            style={{
                width,
                height,
                fontSize,
                resize,
                overflow: scrollable ? "auto" : "hidden",
            }}
            onInput={onInput}
            disabled={isDisabled}
            readOnly={readOnly}
            placeholder={placeholder}
            maxLength={maxLength}
            required={required}
        />
    );
}
