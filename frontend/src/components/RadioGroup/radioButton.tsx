"use client";

import radioButtonStyle from "./radioButton.module.css";
import { ChangeEvent, InputHTMLAttributes, useId } from "react";
import { useRadioGroupContext } from "./context";
import { OptionValue } from "./types";

interface RadioButtonArgs extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    selectedValue?: OptionValue;
    onSelected?: (event: ChangeEvent<HTMLInputElement>) => void;
    onSelectedChange?: (value: OptionValue) => void;
}

export default function RadioButton({
    label = undefined,
    onSelected = undefined,
    ...args
}: RadioButtonArgs) {
    const context = useRadioGroupContext();

    const internalIsSelected =
        context.internalSelectedValue === (args.value ?? label);

    const radioBtnId = useId();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (args.disabled) return;

        args.onChange?.(event);

        if (event.defaultPrevented) return;

        context.setInternalSelectedValue?.(args.value ?? label);

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
                value={args.value ?? label}
                {...args}
                onChange={handleChange}
            />
            <label htmlFor={radioBtnId}>{label}</label>
        </div>
    );
}
