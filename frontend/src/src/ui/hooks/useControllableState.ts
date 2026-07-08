import {
    useState,
    useCallback,
    type Dispatch,
    type SetStateAction,
} from "react";

type ControllableProps<T> = {
    defaultValue?: T;
    value?: T;
    onChange?: Dispatch<SetStateAction<T>>;
};

function useControllableState<T>(
    props: ControllableProps<T>
): [T, Dispatch<SetStateAction<T>>] {
    // const isControllable = props.value !== undefined;
    const isControllable = props.value !== undefined;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [internalValue, setInternalValue] = useState<T>(props.defaultValue!);

    const state = isControllable ? (props.value as T) : internalValue;

    const dispatch: Dispatch<SetStateAction<T>> = useCallback(
        (stateAction: SetStateAction<T>) => {
            if (isControllable) {
                props.onChange?.(stateAction);
            } else {
                setInternalValue(stateAction);
            }
        },
        [isControllable, props]
    );

    return [state, dispatch] as const;
}

export default useControllableState;
