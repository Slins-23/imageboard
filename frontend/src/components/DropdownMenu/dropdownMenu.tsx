"use client";

import dropdownStyle from "./dropdownMenu.module.css";
import { useState, useEffect, useRef, useLayoutEffect, useId } from "react";

type DropdownEntry = {
    value: string;
    callback?: () => void;
};

type DropdownEntries = Array<DropdownEntry>;

export function DropdownMenu({
    dropdownEntries,
    responsive = true,
    fontSize = "1rem",
    width = "300px",
}: {
    dropdownEntries: DropdownEntries;
    responsive: boolean;
    fontSize?: string;
    width?: string;
}) {
    const dropdownId = useId();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setValue] =
        dropdownEntries.length > 0
            ? useState(dropdownEntries[0].value)
            : useState("");
    const rootNode = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
    const selectedItemIdx = useRef(0);
    const focusedItemIdx = useRef(0);

    const listRef = useRef<HTMLUListElement>(null);

    const [menuWidth, setMenuWidth] = useState<string>("auto");
    const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined);

    function setItemRef(element: HTMLLIElement | null, index: number) {
        if (element && !itemRefs.current?.includes(element)) {
            itemRefs.current[index] = element;
        }
    }

    useEffect(() => {
        if (!isOpen) return undefined;

        function closeDropdown(event: PointerEvent) {
            if (!rootNode.current?.contains(event.target as Node))
                setIsOpen(false);
        }

        function traverseList(event: KeyboardEvent) {
            event.preventDefault();

            const itemCount: number = dropdownEntries.length;

            switch (event.code) {
                case "ArrowUp": {
                    if (focusedItemIdx.current > 0) {
                        focusedItemIdx.current--;

                        const newFocusedItem =
                            itemRefs.current[focusedItemIdx.current];

                        newFocusedItem?.focus();
                    }

                    break;
                }
                case "ArrowDown": {
                    if (focusedItemIdx.current < itemCount - 1) {
                        focusedItemIdx.current++;

                        const newFocusedItem =
                            itemRefs.current[focusedItemIdx.current];

                        newFocusedItem?.focus();
                    }

                    break;
                }
                case "Enter":
                case "Space": {
                    if (selectedItemIdx.current !== focusedItemIdx.current) {
                        selectedItemIdx.current = focusedItemIdx.current;

                        setValue(
                            dropdownEntries[selectedItemIdx.current].value
                        );
                    }

                    setIsOpen(!isOpen);
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

    if (responsive) {
        const currentWindowWidth = useRef(0);
        const currentWindowHeight = useRef(0);

        const lastResizeDelay = useRef(200);
        const resizeQueued = useRef(false);
        const timeoutId = useRef<NodeJS.Timeout | number | null>(null);

        useLayoutEffect(() => {
            const listElement = listRef.current;
            if (!listElement) return undefined;

            currentWindowWidth.current = window.innerWidth;
            currentWindowHeight.current = window.innerHeight;

            if (listRef.current) {
                const width = listRef.current.getBoundingClientRect().width;
                setMaxWidth(width);
                setMenuWidth(`${width}px`);
            }

            const handleResize = (fromRecursion: boolean) => {
                console.log("Resize function triggered (handleResize)");

                if (fromRecursion && !resizeQueued.current) {
                    return undefined;
                }

                if (listElement) {
                    const previousWindowWidth = currentWindowWidth.current;
                    const previousWindowHeight = currentWindowHeight.current;

                    currentWindowWidth.current = window.innerWidth;
                    currentWindowHeight.current = window.innerHeight;

                    const dWidth =
                        currentWindowWidth.current - previousWindowWidth;
                    const dHeight =
                        currentWindowHeight.current - previousWindowHeight;

                    // const currentWidth = listElement.getBoundingClientRect().width;
                    // // Rounded down (FLOOR)
                    // if (Math.round(currentWidth) - currentWidth < 0) {
                    //     setMenuWidth(`${currentWidth}px`);
                    //     // Rounded up (CEIL)
                    // } else if (Math.round(currentWidth) - currentWidth > 0) {
                    //     setMenuWidth(`${currentWidth}px`);
                    // } else {
                    //     setMenuWidth(`${currentWidth}px`);
                    // }

                    const listBoundingWidth =
                        listElement.getBoundingClientRect().width;

                    listElement.style.width = `${listBoundingWidth + dWidth}px`;

                    /*
                const currentWidth = listElement.getBoundingClientRect().width;
                const finalWidth =
                    window.innerWidth <= currentWidth
                        ? window.innerWidth - 50
                        : currentWidth;
                */

                    const computedListStyle = getComputedStyle(listElement);
                    const totalBorderWidth =
                        Number.parseFloat(computedListStyle.borderLeftWidth) +
                        Number.parseFloat(computedListStyle.borderRightWidth);
                    const listItemWidthStr = `${listBoundingWidth - totalBorderWidth}px`;

                    for (const itemRef of itemRefs.current) {
                        if (itemRef) {
                            itemRef.style.width = listItemWidthStr;
                        }
                    }

                    // setMenuWidth(`${finalWidth}px`);
                    setMenuWidth(listElement.style.width);

                    if (!fromRecursion && !resizeQueued.current) {
                        resizeQueued.current = true;
                        timeoutId.current = setTimeout(
                            handleResize,
                            lastResizeDelay.current,
                            true
                        );
                    } else if (!fromRecursion && resizeQueued.current) {
                        clearTimeout(timeoutId.current as number);
                        timeoutId.current = setTimeout(
                            handleResize,
                            lastResizeDelay.current,
                            true
                        );
                    } else if (fromRecursion && resizeQueued.current) {
                        resizeQueued.current = false;
                    }
                }
            };

            const resizeCallback = () => handleResize(false);

            window.addEventListener("resize", resizeCallback);

            return () => {
                window.removeEventListener("resize", resizeCallback);
                // observer.disconnect();
            };
        }, [dropdownEntries]);
    }

    return (
        <div
            ref={rootNode}
            className={dropdownStyle.wrapper}
            style={{ width: responsive ? menuWidth : width, fontSize }}
        >
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
                className={dropdownStyle.select}
                style={
                    responsive
                        ? {
                              borderBottomColor: isOpen
                                  ? "transparent"
                                  : "var(--tertiary)",
                              maxWidth: `${maxWidth}px`,
                          }
                        : {
                              borderBottomColor: isOpen
                                  ? "transparent"
                                  : "var(--tertiary)",
                          }
                }
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={dropdownId}
            >
                {selectedValue}
            </button>
            <ul
                id={dropdownId}
                ref={listRef}
                className={
                    `${dropdownStyle.list}` +
                    (isOpen ? "" : " " + dropdownStyle.hidden)
                }
                role="listbox"
                style={responsive ? { maxWidth: `${maxWidth}px` } : { width }}
            >
                {dropdownEntries.map((entry: DropdownEntry, idx: number) => {
                    const value: string = entry.value;
                    const callback: (() => void) | undefined = entry.callback;

                    return (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        <li
                            ref={(element) => setItemRef(element, idx)}
                            key={idx}
                            role="option"
                            aria-selected={selectedItemIdx.current === idx}
                            value={value}
                            tabIndex={0}
                            onClick={() => {
                                if (callback !== undefined) callback();
                                setValue(value);
                                selectedItemIdx.current = idx;
                                focusedItemIdx.current = idx;
                                setIsOpen(false);
                            }}
                            style={
                                responsive
                                    ? { maxWidth: `${maxWidth}px` }
                                    : { width }
                            }
                        >
                            {value}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
