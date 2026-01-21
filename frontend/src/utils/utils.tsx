import { useState, useCallback } from "react";

export interface ControllableProps<T> {
    value?: T;
    defaultValue?: T;
    onChange?: (newValue: T) => void;
}

export function useControllableState<T>({
    value,
    defaultValue,
    onChange,
}: ControllableProps<T>): [T | undefined, (newValue: T) => void] {
    const isControllable = value !== undefined;

    const [internalValue, setInternalValue] = useState<T | undefined>(
        defaultValue
    );

    const state = isControllable ? value : internalValue;

    const setState = useCallback((newValue: T) => {
        if (isControllable) {
            onChange?.(newValue);
        } else {
            setInternalValue(newValue);
        }
    }, []);

    return [state, setState] as const;
}
