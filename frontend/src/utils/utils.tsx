import {
    useState,
    useCallback,
    type MouseEvent,
    type KeyboardEvent,
} from "react";

type SetActionState<T> = T | ((prev: T) => T);

export interface ControllableProps<T> {
    value?: T;
    defaultValue?: T;
    onChange?: (newValue: T) => void;
}

export function useControllableState<T>({
    value,
    defaultValue,
    onChange,
}: ControllableProps<T>): [
    T | undefined,
    (setAction: SetActionState<T>) => void,
] {
    const isControllable = value !== undefined;

    const [internalValue, setInternalValue] = useState<T | undefined>(
        defaultValue
    );

    const state = isControllable ? value : internalValue;

    const setState = useCallback(
        (setAction: SetActionState<T>) => {
            if (isControllable) {
                const newState =
                    typeof setAction === "function"
                        ? (setAction as (prev: T) => T)(value as T)
                        : setAction;

                onChange?.(newState);
            } else {
                setInternalValue((prev) =>
                    typeof setAction === "function"
                        ? (setAction as (prev: T) => T)(prev as T)
                        : setAction
                );
            }
        },
        [isControllable, onChange, value]
    );

    return [state, setState] as const;
}

export function isMouseEvent(
    event: MouseEvent | KeyboardEvent
): event is MouseEvent {
    return event.type === "click";
}
