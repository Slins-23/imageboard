"use client";

import useControllableState from "@/ui/hooks/useControllableState";
import { RadioGroupContext } from "./context";
import {
    type ChangeEvent,
    type ReactNode,
    type Dispatch,
    type SetStateAction,
    useId,
} from "react";
import { OptionValue } from "./types";
import radioGroupStyle from "./RadioGroup.module.css";

interface RadioGroupProps {
    groupName?: string;
    selectedValue?: OptionValue;
    defaultSelectedValue?: OptionValue;
    onSelectedChange?: Dispatch<SetStateAction<OptionValue>>;
    onSelected?: (event: ChangeEvent<HTMLInputElement>) => void;
    itemGap?: string;
    buttonTextGap?: string;
    children?: ReactNode;
}

// Labels and values are the same if one is omitted
export default function RadioGroup({
    groupName,
    selectedValue,
    defaultSelectedValue,
    onSelectedChange,
    onSelected,
    itemGap = "1.5rem",
    buttonTextGap = "0.7rem",
    children,
}: RadioGroupProps) {
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
