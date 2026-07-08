"use client";

import {
    type ChangeEvent,
    type ComponentPropsWithoutRef,
    type Dispatch,
    type SetStateAction,
} from "react";
import textBoxStyle from "./TextBox.module.css";
import useControllableState from "@/ui/hooks/useControllableState";
import clsx from "clsx";

interface TextBoxProps extends ComponentPropsWithoutRef<"input"> {
    defaultValue?: string;
    value?: string;
    transformText?: (value: string) => string;
    onTextChange?: Dispatch<SetStateAction<string>>;
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
    value,
    transformText,
    onTextChange,
    type = "text",
    ...props
}: TextBoxProps) {
    const [textState, setTextState] = useControllableState<string>({
        value,
        defaultValue,
        onChange: onTextChange,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (props.disabled || event.defaultPrevented) return;

        let currentText = event.target?.value;
        if (transformText !== undefined) {
            currentText = transformText?.(currentText);
        }

        setTextState(currentText);
    };

    return (
        <input
            type={type}
            value={textState ?? ""}
            {...props}
            className={clsx(textBoxStyle.textBox, props.className)}
            onChange={handleChange}
        />
    );
}
