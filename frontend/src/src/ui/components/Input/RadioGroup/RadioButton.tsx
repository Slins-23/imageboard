"use client";

import radioButtonStyle from "./RadioButton.module.css";
import { type ComponentPropsWithoutRef, type ChangeEvent, useId } from "react";
import { useRadioGroupContext } from "./context";
import { OptionValue } from "./types";

interface RadioButtonProps {
    label?: string;
    value?: OptionValue;
    onSelected?: (event: ChangeEvent<HTMLInputElement>) => void;
    onSelectedChange?: (value: OptionValue) => void;
    inputProps?: ComponentPropsWithoutRef<"input">;
    labelProps?: ComponentPropsWithoutRef<"label">;
}

export default function RadioButton({
    label,
    value,
    onSelected,
    inputProps,
    labelProps,
}: RadioButtonProps) {
    const context = useRadioGroupContext();

    const internalIsSelected =
        context.internalSelectedValue === (value ?? label);

    const radioBtnId = useId();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (inputProps?.disabled) return;

        inputProps?.onChange?.(event);

        if (event.defaultPrevented) return;

        context.setInternalSelectedValue?.(value ?? label);

        if (onSelected === undefined) {
            context.onSelected?.(event);
        } else {
            onSelected(event);
        }
    };

    return (
        <div
            className={radioButtonStyle.wrapper}
            style={{
                gap: context.buttonTextGap,
            }}
        >
            <input
                id={radioBtnId}
                name={context.groupName}
                className={radioButtonStyle.button}
                type="radio"
                aria-checked={internalIsSelected}
                checked={internalIsSelected}
                value={value ?? label}
                {...inputProps}
                onChange={handleChange}
            />
            <label
                style={{ fontSize: "var(--font-size-lg)" }}
                htmlFor={radioBtnId}
                {...labelProps}
            >
                {label}
            </label>
        </div>
    );
}
