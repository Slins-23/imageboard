"use client";

import radioBtnStyle from "./radioButton.module.css";
import { useState, type ChangeEvent, type InputHTMLAttributes } from "react";

interface RadioButtonArgs extends InputHTMLAttributes<HTMLInputElement> {
    selectedValue?: string;
    onSelected?: (event: ChangeEvent<HTMLInputElement>) => void;
    onSelectedChange?: (value: string) => void;
}

export default function RadioButton({
    selectedValue = undefined,
    onSelected = undefined,
    onSelectedChange = undefined,
    ...args
}: RadioButtonArgs) {
    const [internalIsSelected, setInternalIsSelected] = useState(
        selectedValue === args.value
    );

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (args.disabled) return;

        args.onChange?.(event);

        if (event.defaultPrevented) return;

        setInternalIsSelected(true);

        if (typeof args.value === "string") onSelectedChange?.(args.value);

        onSelected?.(event);
    };

    return (
        <input
            className={`${radioBtnStyle.button}`}
            type="radio"
            aria-checked={internalIsSelected}
            checked={internalIsSelected}
            {...args}
            onChange={handleChange}
        />
    );
}
