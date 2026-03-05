"use client";

import dropdownStyle from "./dropdownMenu.module.css";
import {
    useState,
    useEffect,
    useRef,
    useLayoutEffect,
    useId,
    useCallback,
    type MouseEvent,
    type KeyboardEvent as ReactKeyboardEvent,
    type HTMLAttributes,
    type ButtonHTMLAttributes,
    type LiHTMLAttributes,
} from "react";
import { isMouseEvent, useControllableState } from "@/utils/utils";

interface DropdownEntry {
    value: string;
    callback?: () => void;
}

type DropdownEntries = Array<Readonly<DropdownEntry>>;

interface DropdownMenuArgs extends HTMLAttributes<HTMLDivElement> {
    dropdownEntries: DropdownEntries;
    selectedIdx?: number;
    defaultSelectedIdx?: number;
    onSelected?: (
        event: MouseEvent<HTMLLIElement> | ReactKeyboardEvent<HTMLLIElement>
    ) => void;
    onSelectedChange?: (selectedIdx: number) => void;
    responsive?: boolean;
    fontSize?: string;
    width?: string;
    buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
    listProps?: HTMLAttributes<HTMLUListElement>;
    itemProps?: LiHTMLAttributes<HTMLLIElement>;
}

export function DropdownMenu({
    dropdownEntries = [
        { value: "One" },
        { value: "Two" },
        {
            value: "Threeeeeeeeeeeeeeeeeeeesssssaaac",
            callback: () => console.log("Three clicked"),
        },
    ],
    selectedIdx = undefined,
    defaultSelectedIdx = 0,
    onSelected = undefined,
    onSelectedChange = undefined,
    responsive = true,
    fontSize = "var(--font-size-md)",
    width = "300px",
    buttonProps = undefined,
    listProps = undefined,
    itemProps = undefined,
    ...args
}: DropdownMenuArgs) {
    const dropdownId = useId();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const rootNode = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    const [internalSelectedIdx, setInternalSelectedIdx] = useControllableState({
        value: selectedIdx,
        defaultValue: defaultSelectedIdx,
        onChange: onSelectedChange,
    });

    const focusedItemIdx = useRef<number>(
        selectedIdx === undefined ||
            selectedIdx < 0 ||
            selectedIdx > dropdownEntries.length - 1
            ? defaultSelectedIdx
            : selectedIdx
    );

    const menuWidth = useRef<number | null>(null);
    const maxWidth = useRef<number | null>(null);

    /*
    const setItemRefs = useCallback(
        (element: HTMLLIElement | null, index: number) => {
            if (element && !itemRefs.current.includes(element)) {
                itemRefs.current[index] = element;
            }
        },
        []
    );
    */

    const updateMenuWidth = useCallback(
        (localMenuWidth?: number, localMaxWidth?: number) => {
            if (localMenuWidth === undefined && localMaxWidth === undefined)
                return;

            if (localMenuWidth) {
                menuWidth.current = localMenuWidth;

                // ROOTNODE
                if (rootNode.current)
                    rootNode.current.style.width = `${localMenuWidth}px`;
            }

            if (localMaxWidth) {
                maxWidth.current = localMaxWidth;

                // BUTTON
                if (buttonRef.current)
                    buttonRef.current.style.maxWidth = `${localMaxWidth}px`;

                // LIST
                if (listRef.current)
                    listRef.current.style.maxWidth = `${localMaxWidth}px`;

                // ITEMS
                if (itemRefs.current) {
                    for (const itemRef of itemRefs.current) {
                        if (itemRef)
                            itemRef.style.maxWidth = `${localMaxWidth}px`;
                    }
                }
            }
        },
        []
    );

    useLayoutEffect(() => {
        if (!responsive) return undefined;

        const listElement: HTMLUListElement | null = listRef.current;
        if (!listElement || !listRef.current) return undefined;

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

        if (document.fonts?.ready) {
            document.fonts.ready.then(() => {
                const width: number | undefined =
                    listRef.current?.getBoundingClientRect().width;
                updateMenuWidth(width, width);
            });
        } else {
            requestAnimationFrame(() => {
                const width: number | undefined =
                    listRef.current?.getBoundingClientRect().width;
                updateMenuWidth(width, width);
            });
        }

        const handleResize = (fromRecursion: boolean) => {
            // console.log("Resize function triggered (handleResize)");

            if (fromRecursion && !resizeQueued) {
                return;
            }

            if (listElement) {
                const previousWindowWidth: number = currentWindowWidth;
                const previousWindowHeight: number = currentWindowHeight;

                currentWindowWidth = window.innerWidth;
                currentWindowHeight = window.innerHeight;

                const dWidth: number = currentWindowWidth - previousWindowWidth;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const dHeight: number =
                    currentWindowHeight - previousWindowHeight;

                const listBoundingWidth: number =
                    listElement.getBoundingClientRect().width;

                listElement.style.width = `${listBoundingWidth + dWidth}px`;

                const computedListStyle: CSSStyleDeclaration =
                    getComputedStyle(listElement);
                const totalBorderWidth: number =
                    Number.parseFloat(computedListStyle.borderLeftWidth) +
                    Number.parseFloat(computedListStyle.borderRightWidth);
                const listItemWidthStr: string = `${listBoundingWidth - totalBorderWidth}px`;

                for (const itemRef of itemRefs.current) {
                    if (itemRef) {
                        itemRef.style.width = listItemWidthStr;
                    }
                }

                updateMenuWidth(Number.parseFloat(listElement.style.width));

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
    }, [responsive, dropdownEntries]);

    useEffect(() => {
        if (!listRef.current) return undefined;

        itemRefs.current = [...listRef.current.querySelectorAll("li")];

        return undefined;
    }, [dropdownEntries]);

    useEffect(() => {
        if (!isOpen) return undefined;

        // itemRefs.current[internalSelectedIdx as number]?.focus();
        focusedItemIdx.current = internalSelectedIdx as number;

        function closeDropdown(event: PointerEvent) {
            if (!rootNode.current?.contains(event.target as Node))
                setIsOpen(false);
        }

        function traverseList(event: KeyboardEvent) {
            const itemCount: number = dropdownEntries.length;

            switch (event.code) {
                case "ArrowUp": {
                    event.preventDefault();
                    if (focusedItemIdx.current > 0) {
                        focusedItemIdx.current--;

                        const newFocusedItem: HTMLLIElement | null =
                            itemRefs.current[focusedItemIdx.current];

                        newFocusedItem?.focus();
                    }

                    break;
                }
                case "ArrowDown": {
                    event.preventDefault();
                    if (focusedItemIdx.current < itemCount - 1) {
                        focusedItemIdx.current++;

                        const newFocusedItem: HTMLLIElement | null =
                            itemRefs.current[focusedItemIdx.current];

                        newFocusedItem?.focus();
                    }

                    break;
                }
                case "Enter":
                case "Space": {
                    event.preventDefault();
                    itemRefs.current[focusedItemIdx.current]?.click();
                    break;
                }
                default: {
                    break;
                }
            }
        }

        document.addEventListener("pointerdown", closeDropdown);
        document.addEventListener("keydown", traverseList);

        return () => {
            document.removeEventListener("pointerdown", closeDropdown);
            document.removeEventListener("keydown", traverseList);
        };
    }, [isOpen]);

    const handleItemClick = (
        event: MouseEvent<HTMLLIElement> | ReactKeyboardEvent<HTMLLIElement>,
        entry: DropdownEntry,
        idx: number
    ) => {
        if (buttonProps?.disabled) return;

        if (isMouseEvent(event)) {
            itemProps?.onClick?.(event);
        } else {
            itemProps?.onKeyDown?.(event);
        }

        if (event.defaultPrevented) return;

        setInternalSelectedIdx(idx);

        focusedItemIdx.current = idx;

        if (event.type === "keydown") setIsOpen((prev) => !prev);
        else setIsOpen(false);

        entry.callback?.();

        onSelected?.(event);
    };

    const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (buttonProps?.disabled || event.defaultPrevented) return;

        setIsOpen((prev) => !prev);

        buttonProps?.onClick?.(event);
    };
    const handleButtonKeyDown = (
        event: ReactKeyboardEvent<HTMLButtonElement>
    ) => {
        if (buttonProps?.disabled) return;

        buttonProps?.onKeyDown?.(event);

        // eslint-disable-next-line no-useless-return
        if (event.defaultPrevented) return;
    };

    return (
        <div
            className={dropdownStyle.wrapper}
            style={{ fontSize }}
            {...args}
            ref={rootNode}
        >
            <button
                className={dropdownStyle.select}
                style={{
                    ...(responsive
                        ? {
                              borderBottomColor: isOpen
                                  ? "transparent"
                                  : "var(--tertiary)",
                          }
                        : {
                              borderBottomColor: isOpen
                                  ? "transparent"
                                  : "var(--tertiary)",
                              width,
                              maxWidth: width,
                          }),
                    ...buttonProps?.style,
                }}
                data-isopen={isOpen}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={dropdownId}
                {...buttonProps}
                ref={buttonRef}
                onClick={handleButtonClick}
                onKeyDown={handleButtonKeyDown}
            >
                {dropdownEntries[internalSelectedIdx as number].value}
            </button>
            <ul
                className={dropdownStyle.list}
                role="listbox"
                aria-hidden={!isOpen}
                {...listProps}
                style={responsive ? {} : { width, maxWidth: width }}
                id={dropdownId}
                ref={listRef}
            >
                {dropdownEntries.map(
                    (entry: Readonly<DropdownEntry>, idx: number) => {
                        return (
                            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                            <li
                                role="option"
                                tabIndex={0}
                                aria-selected={internalSelectedIdx === idx}
                                value={entry.value}
                                {...itemProps}
                                style={
                                    responsive
                                        ? { ...itemProps?.style }
                                        : {
                                              width,
                                              maxWidth: width,
                                              ...itemProps?.style,
                                          }
                                }
                                key={idx}
                                onClick={(event: MouseEvent<HTMLLIElement>) =>
                                    handleItemClick(event, entry, idx)
                                }
                            >
                                {entry.value}
                            </li>
                        );
                    }
                )}
            </ul>
        </div>
    );
}
