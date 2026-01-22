"use client";

import dropdownStyle from "./dropdownMenu.module.css";
import {
    useState,
    useEffect,
    useRef,
    useLayoutEffect,
    useId,
    useCallback,
} from "react";

interface DropdownEntry {
    value: string;
    callback?: () => void;
}

type DropdownEntries = Array<DropdownEntry>;

export function DropdownMenu({
    dropdownEntries = [
        { value: "One" },
        { value: "Two" },
        {
            value: "Threeeeeeeeeeeeeeeeeeeesssssaaac",
            callback: () => console.log("Three clicked"),
        },
    ],
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

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedValue, setValue] =
        dropdownEntries.length > 0
            ? useState<string>(dropdownEntries[0].value)
            : useState<string>("");

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const rootNode = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);
    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

    const selectedItemIdx = useRef<number>(0);
    const focusedItemIdx = useRef<number>(0);

    const menuWidth = useRef<number | undefined>(undefined);
    const maxWidth = useRef<number | undefined>(undefined);

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
        if (!listElement) return undefined;

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

        if (listRef.current) {
            const width: number = listRef.current.getBoundingClientRect().width;
            updateMenuWidth(width, width);
        }

        const handleResize = (fromRecursion: boolean) => {
            console.log("Resize function triggered (handleResize)");

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

                        const newFocusedItem: HTMLLIElement | null =
                            itemRefs.current[focusedItemIdx.current];

                        newFocusedItem?.focus();
                    }

                    break;
                }
                case "ArrowDown": {
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

    return (
        <div
            ref={rootNode}
            className={dropdownStyle.wrapper}
            style={{ fontSize }}
        >
            <button
                ref={buttonRef}
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
                          }
                        : {
                              borderBottomColor: isOpen
                                  ? "transparent"
                                  : "var(--tertiary)",
                              width,
                              maxWidth: width,
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
                    `${dropdownStyle.list}` //+
                    // (isOpen ? "" : " " + dropdownStyle.hidden)
                }
                // { isOpen && { "aria-hidden"="true" } }
                aria-hidden={!isOpen}
                role="listbox"
                style={responsive ? {} : { width, maxWidth: width }}
            >
                {dropdownEntries.map((entry: DropdownEntry, idx: number) => {
                    const value: string = entry.value;
                    const callback: (() => void) | undefined = entry.callback;

                    return (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        <li
                            // Avoiding using React references directly and doing it manually instead as it gets reset every window resize
                            // ref={(element) => setItemRef(element, idx)}
                            key={idx}
                            role="option"
                            aria-selected={selectedItemIdx.current === idx}
                            value={value}
                            tabIndex={0}
                            onClick={() => {
                                if (callback !== undefined) callback();
                                selectedItemIdx.current = idx;
                                focusedItemIdx.current = idx;
                                setValue(value);
                                setIsOpen(false);
                            }}
                            style={responsive ? {} : { width, maxWidth: width }}
                        >
                            {value}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
