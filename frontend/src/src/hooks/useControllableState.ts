import {
    useState,
    useCallback,
    type Dispatch,
    type SetStateAction,
} from "react";

export interface ControllableProps<T> {
    value?: T;
    defaultValue?: T;
    onChange?: Dispatch<SetStateAction<T | undefined>>;
}

function useControllableState<T>(
    props: ControllableProps<T> & {
        defaultValue: T;
    }
): [T, Dispatch<SetStateAction<T>>];
function useControllableState<T>(
    props: ControllableProps<T>
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
    const isControllable = props.value !== undefined;

    const [internalValue, setInternalValue] = useState<T>(
        props.defaultValue as T
    );

    const state = isControllable ? props.value : internalValue;

    const dispatch: Dispatch<SetStateAction<T | undefined>> = useCallback(
        (stateAction: SetStateAction<T | undefined>) => {
            if (isControllable) {
                props.onChange?.(stateAction);
            } else {
                setInternalValue(stateAction as SetStateAction<T>);
            }
        },
        [isControllable, props.onChange]
    );

    return [state, dispatch] as const;
}

export default useControllableState;
