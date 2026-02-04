"use client";

import {
    useRef,
    useCallback,
    useLayoutEffect,
    type ChangeEvent,
    type TextareaHTMLAttributes,
} from "react";
import textAreaStyle from "./textArea.module.css";
import { useControllableState } from "@/utils/utils";

interface textAreaArgs extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    defaultValue?: string;
    value?: string;
    transformText?: (value: string) => string;
    onTextChange?: (value: string) => void;
    width?: string;
    height?: string;
    fontSize?: string;
    resize?: "none" | "both" | "vertical" | "horizontal";
    scrollable?: boolean;
    responsive?: boolean;
}

export default function TextArea({
    defaultValue = "",
    value = undefined,
    transformText = undefined,
    onTextChange = undefined,
    width = "310px",
    height = "130px",
    fontSize = "1.15rem",
    resize = "none",
    scrollable = true,
    responsive = false,
    ...args
}: textAreaArgs) {
    const textAreaElementRef = useRef<HTMLTextAreaElement | null>(null);

    const dynamicWidth = useRef<number | undefined>(undefined);
    const dynamicHeight = useRef<number | undefined>(undefined);

    const [textState, setTextState] = useControllableState({
        value,
        defaultValue,
        onChange: onTextChange,
    });

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (args.disabled || event.defaultPrevented) return;

        let currentText = event.target?.value;

        if (transformText !== undefined) {
            currentText = transformText?.(currentText);
        }

        setTextState(currentText);
    };

    const updateDimensions = useCallback((width?: number, height?: number) => {
        if (width === undefined && height === undefined) return;

        const element: HTMLTextAreaElement | null = textAreaElementRef.current;

        if (element === null) return;

        if (width) {
            dynamicWidth.current = width;
            element.style.width = `${width}px`;
        }

        if (height) {
            dynamicHeight.current = height;
            element.style.height = `${height}px`;
        }

        /*
        if (localMaxWidth) {
            maxWidth.current = localMaxWidth;

            // LIST
            if (listRef.current)
                listRef.current.style.maxWidth = `${localMaxWidth}px`;

        }
        */
    }, []);

    useLayoutEffect(() => {
        if (!responsive) return undefined;

        const textAreaElement: HTMLTextAreaElement | null =
            textAreaElementRef.current;

        if (!textAreaElement) return undefined;

        let currentWindowWidth: number = 0;
        let currentWindowHeight: number = 0;

        // Controls how long, in milliseconds after the last resize, to re-calculate the width for the elements
        // Makes up for inconsistencies due to lack of synchronization
        // Can take too long to update UI if too big, but also becomes more accurate
        // Can update the UI very fast, but also becomes less accurate and more computationally expensive, also increases the risk and potential number of obsolete updates
        const lastResizeDelay: number = 200;

        let resizeQueued: boolean = false;
        let timeoutId: NodeJS.Timeout | number | undefined = undefined;

        currentWindowWidth = window.innerWidth;
        currentWindowHeight = window.innerHeight;

        if (textAreaElement) {
            const width: number = textAreaElement.getBoundingClientRect().width;
            const height: number =
                textAreaElement.getBoundingClientRect().height;
            updateDimensions(width, height);
        }

        const handleResize = (fromRecursion: boolean) => {
            console.log("Resize function triggered (handleResize)");

            if (
                !dynamicWidth.current ||
                !dynamicHeight.current ||
                (fromRecursion && !resizeQueued)
            ) {
                return;
            }

            if (textAreaElement) {
                const previousWindowWidth: number = currentWindowWidth;
                const previousWindowHeight: number = currentWindowHeight;

                currentWindowWidth = window.innerWidth;
                currentWindowHeight = window.innerHeight;

                const dWidth: number = currentWindowWidth - previousWindowWidth;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const dHeight: number =
                    currentWindowHeight - previousWindowHeight;

                const elementBoundingWidth: number = dynamicWidth.current;
                // textAreaElement.getBoundingClientRect().width;
                const elementBoundingHeight: number = dynamicHeight.current;
                // textAreaElement.getBoundingClientRect().height;

                // textAreaElement.style.width = `${elementBoundingWidth + dWidth}px`;
                // textAreaElement.style.height = `${elementBoundingHeight + dHeight}px`;

                const finalWidth: number | undefined =
                    dWidth === 0
                        ? undefined
                        : elementBoundingWidth === undefined
                          ? undefined
                          : elementBoundingWidth + dWidth;
                const finalHeight: number | undefined =
                    dHeight === 0
                        ? undefined
                        : elementBoundingHeight === undefined
                          ? undefined
                          : elementBoundingHeight + dHeight;

                updateDimensions(finalWidth, finalHeight);

                if (!fromRecursion && !resizeQueued) {
                    resizeQueued = true;
                    timeoutId = setTimeout(handleResize, lastResizeDelay, true);
                } else if (!fromRecursion && resizeQueued) {
                    clearTimeout(timeoutId as number);
                    timeoutId = setTimeout(handleResize, lastResizeDelay, true);
                } else if (fromRecursion && resizeQueued) {
                    resizeQueued = false;
                }
            }
        };

        const resizeCallback = () => handleResize(false);

        window.addEventListener("resize", resizeCallback);

        return () => {
            window.removeEventListener("resize", resizeCallback);
            // observer.disconnect();
        };
    }, [responsive]);

    return (
        <textarea
            {...args}
            ref={textAreaElementRef}
            className={textAreaStyle.textArea}
            style={{
                width,
                height,
                fontSize,
                resize,
                overflow: scrollable ? "auto" : "hidden",
            }}
            onChange={handleChange}
            value={textState}
        />
    );
}
