"use client";

import { useControllableState } from "@/utils/utils";
import { RadioGroupContext } from "./context";
import { type ChangeEvent, ReactNode, useId } from "react";
import { OptionValue } from "./types";
import radioGroupStyle from "./radioGroup.module.css";

interface RadioGroupArgs {
    groupName?: string;
    selectedValue?: OptionValue;
    defaultSelectedValue?: OptionValue;
    onSelectedChange?: (selectedValue: OptionValue) => void;
    onSelected?: (event: ChangeEvent<HTMLInputElement>) => void;
    itemGap?: string;
    buttonTextGap?: string;
    children?: ReactNode;
}

// Labels and values are the same if one is omitted
export default function RadioGroup({
    groupName = undefined,
    selectedValue = undefined,
    defaultSelectedValue = undefined,
    onSelectedChange = undefined,
    onSelected = undefined,
    itemGap = "1.5rem",
    buttonTextGap = "0.7rem",
    children = null,
}: RadioGroupArgs) {
    const groupId = groupName ?? useId();

    const [internalSelectedValue, setInternalSelectedValue] =
        useControllableState<OptionValue>({
            defaultValue: defaultSelectedValue,
            value: selectedValue,
            onChange: onSelectedChange,
        });

    return (
        <div
            className={radioGroupStyle.wrapper}
            style={{
                gap: itemGap,
            }}
        >
            <RadioGroupContext.Provider
                value={{
                    groupName: groupId,
                    internalSelectedValue,
                    setInternalSelectedValue,
                    onSelected,
                    buttonTextGap,
                }}
            >
                {children}
            </RadioGroupContext.Provider>
        </div>
    );
}
