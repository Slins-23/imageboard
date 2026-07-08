"use client";

import radioButtonStyle from "./RadioButton.module.css";
import { type ComponentPropsWithoutRef, type ChangeEvent, useId } from "react";
import { useRadioGroupContext } from "./context";
import { OptionValue } from "./types";

interface RadioButtonProps extends ComponentPropsWithoutRef<"input"> {
    label?: string;
    selectedValue?: OptionValue;
    onSelected?: (event: ChangeEvent<HTMLInputElement>) => void;
    onSelectedChange?: (value: OptionValue) => void;
}

export default function RadioButton({
    label,
    onSelected,
    ...props
}: RadioButtonProps) {
    const context = useRadioGroupContext();

    const internalIsSelected =
        context.internalSelectedValue === (props.value ?? label);

    const radioBtnId = useId();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (props.disabled) return;

        props.onChange?.(event);

        if (event.defaultPrevented) return;

        context.setInternalSelectedValue?.(props.value ?? label);

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
                value={props.value ?? label}
                {...props}
                onChange={handleChange}
            />
            <label htmlFor={radioBtnId}>{label}</label>
        </div>
    );
}
