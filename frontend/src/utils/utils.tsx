import {
    useState,
    useCallback,
    type MouseEvent,
    type KeyboardEvent,
} from "react";

export type SetStateAction<T> = T | ((prev: T) => T);

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
    (setAction: SetStateAction<T>) => void,
] {
    const isControllable = value !== undefined;

    const [internalValue, setInternalValue] = useState<T | undefined>(
        defaultValue
    );

    const state = isControllable ? value : internalValue;

    const setState = useCallback(
        (setAction: SetStateAction<T>) => {
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

export function capitalize(text: string) {
    const words = text.split(" ");
    const capitalizedWords = words.map(
        (word: string) => word[0].toUpperCase() + word.slice(1)
    );
    const joinedWords = capitalizedWords.join(" ");

    return joinedWords;
}

export function makeKebabCase(text: string) {
    const words = text.split(" ");
    const lowercaseWords = words.map((word: string) => word.toLowerCase());
    const joinedWords = lowercaseWords.join("-");

    return joinedWords;
}

export async function filledElementFromSVG(
    src: string,
    width?: string | number,
    height?: string | number
): Promise<SVGElement | undefined> {
    const svgPromise = await fetch(src)
        .then((res) => res.text())
        .then((svg) => {
            const tmpContainer = document.createElement("div");
            tmpContainer.innerHTML = svg;

            const svgElement = tmpContainer.children[0] as SVGElement;

            const strokes = svgElement.querySelectorAll("path");

            for (const stroke of strokes) {
                stroke.style.fill = "var(--tertiary)";
            }

            if (width !== undefined) svgElement.style.width = width.toString();
            if (height !== undefined)
                svgElement.style.height = height.toString();

            svgElement.style.display = "block";

            return svgElement;
        });

    return svgPromise;
}

export async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
