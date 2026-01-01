import dropdownStyle from "./dropdownMenu.module.css";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

type DropdownEntry = {
    value: string;
    callback?: () => void;
};

type DropdownEntries = Array<DropdownEntry>;

export function DropdownMenu({
    dropdownEntries,
}: {
    dropdownEntries: DropdownEntries;
}) {
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

    useLayoutEffect(() => {
        const listElement = listRef.current;
        if (!listElement) return;

        const observer = new ResizeObserver((entries) => {
            console.log("Resize observer triggered");
            /*
            for (const entry of entries) {
                setMenuWidth(`${entry.contentRect.width}px`);
            }
                */

            // setMenuWidth(`${entries[0].contentRect.width}px`);

            setMenuWidth(`${entries[0].borderBoxSize[0].inlineSize}px`);
        });

        observer.observe(listElement);

        const handleResize = () => {
            console.log("Resize function triggered (handleResize)");
            if (listElement) {
                const currentWidth = listElement.getBoundingClientRect().width;

                // Rounded down (FLOOR)
                if (Math.round(currentWidth) - currentWidth < 0) {
                    setMenuWidth(`${currentWidth}px`);
                    // Rounded up (CEIL)
                } else if (Math.round(currentWidth) - currentWidth > 0) {
                    setMenuWidth(`${currentWidth}px`);
                } else {
                    setMenuWidth(`${currentWidth}px`);
                }
            }
        };

        /*
        if (listRef.current) {
            const width = listRef.current.getBoundingClientRect().width;
            setMenuWidth(`${width}px`);
        }*/

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            observer.disconnect();
        };
    }, [dropdownEntries]);

    function setItemRef(element: HTMLLIElement | null, index: number) {
        if (element && !itemRefs.current?.includes(element)) {
            itemRefs.current[index] = element;
        }
    }

    useEffect(() => {
        if (!isOpen) return;

        function closeDropdown(event: PointerEvent) {
            if (!rootNode.current?.contains(event.target as Node))
                setIsOpen(false);
        }

        function traverseList(event: KeyboardEvent) {
            event.preventDefault();

            const itemCount: number = dropdownEntries.length;

            switch (event.code) {
                ///*
                case "ArrowUp": {
                    /*
                    if (focusedItemIdx.current > 0) {
                        const previousFocusedItem =
                            itemRefs.current[focusedItemIdx.current];

                        if (previousFocusedItem !== null) {
                            previousFocusedItem.className =
                                previousFocusedItem.className.replace(
                                    dropdownStyle.focused,
                                    ""
                                );
                        }

                        focusedItemIdx.current--;

                        const newFocusedItem =
                            itemRefs.current[focusedItemIdx.current];

                        if (newFocusedItem !== null) {
                            newFocusedItem.className += ` ${dropdownStyle.focused}`;
                        }
                    }
                    */

                    if (focusedItemIdx.current > 0) {
                        focusedItemIdx.current--;

                        const newFocusedItem =
                            itemRefs.current[focusedItemIdx.current];

                        newFocusedItem?.focus();
                    }

                    break;
                }
                case "ArrowDown": {
                    /*
                    if (focusedItemIdx.current < itemCount - 1) {
                        const previousFocusedItem =
                            itemRefs.current[focusedItemIdx.current];

                        if (previousFocusedItem !== null) {
                            previousFocusedItem.className =
                                previousFocusedItem.className.replace(
                                    dropdownStyle.focused,
                                    ""
                                );
                        }

                        focusedItemIdx.current++;

                        const newFocusedItem =
                            itemRefs.current[focusedItemIdx.current];

                        if (newFocusedItem !== null) {
                            newFocusedItem.className += ` ${dropdownStyle.focused}`;
                        }
                    }
                    */

                    if (focusedItemIdx.current < itemCount - 1) {
                        focusedItemIdx.current++;

                        const newFocusedItem =
                            itemRefs.current[focusedItemIdx.current];

                        newFocusedItem?.focus();
                    }

                    break;
                }
                //*/
                case "Enter":
                case "Space": {
                    // Update only if selected item is not already selected
                    /*
                                        if (selectedItemIdx.current !== focusedItemIdx.current) {
                        const oldSelectedItem =
                            itemRefs.current[selectedItemIdx.current];

                        if (oldSelectedItem) {
                            oldSelectedItem.className =
                                oldSelectedItem.className.replace(
                                    dropdownStyle.selected,
                                    ""
                                );
                        }

                        selectedItemIdx.current = focusedItemIdx.current;

                        const newSelectedItem =
                            itemRefs.current[selectedItemIdx.current];

                        if (newSelectedItem) {
                            newSelectedItem.className += ` ${dropdownStyle.selected}`;
                        }

                        setValue(
                            dropdownEntries[selectedItemIdx.current].value
                        );
                    }
                    */
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
        /*
        <div className={`${dropdownStyle.wrapper}`}>
            <select className={`${dropdownStyle.select}`}>
                <option>One</option>
                <option>Two</option>
            </select>
        </div>
        */

        <div
            ref={rootNode}
            className={`${dropdownStyle.wrapper}`}
            style={{ width: menuWidth, fontSize: "1rem" }}
        >
            <div className={dropdownStyle.buttonWrapper}>
                <button
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                    className={`${dropdownStyle.select}`}
                    style={{
                        width: "100%",
                        borderBottomColor: isOpen
                            ? "transparent"
                            : "var(--tertiary)",
                    }}
                    // onKeyDown={(event) => {
                    //     event.preventDefault();
                    //     switch (event.code) {
                    //         case "Space": {
                    //             setIsOpen(!isOpen);
                    //             break;
                    //         }
                    //         case "Enter": {
                    //             setIsOpen(!isOpen);
                    //             break;
                    //         }
                    //         default: {
                    //             break;
                    //         }
                    //     }
                    // }}
                >
                    {selectedValue}
                </button>
            </div>
            <ul
                ref={listRef}
                className={`${dropdownStyle.list}${isOpen ? "" : " " + dropdownStyle.hidden}`}
            >
                {dropdownEntries.map((entry: DropdownEntry, idx) => {
                    const value: string = entry.value;
                    const callback: (() => void) | undefined = entry.callback;

                    return (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        <li
                            ref={(element) => setItemRef(element, idx)}
                            key={idx}
                            role="option"
                            aria-selected={selectedItemIdx.current === idx}
                            /*
                            className={
                                (selectedItemIdx.current === idx
                                    ? dropdownStyle.selected
                                    : "") +
                                (focusedItemIdx.current === idx
                                    ? ` ${dropdownStyle.focused}`
                                    : "")
                            }
                                    */
                            // className={
                            //     selectedItemIdx.current === idx
                            //         ? dropdownStyle.selected
                            //         : ""
                            // }
                            value={value}
                            tabIndex={0}
                            onClick={() => {
                                if (callback !== undefined) callback();
                                setValue(value);
                                selectedItemIdx.current = idx;
                                focusedItemIdx.current = idx;
                                setIsOpen(false);
                            }}
                            // onKeyDown={(event) => {
                            //     event.preventDefault();
                            //     switch (event.code) {
                            //         case "Space": {
                            //             setValue(value);
                            //             selectedItemIdx = idx;
                            //             setIsOpen(false);
                            //             break;
                            //         }
                            //         case "Enter": {
                            //             setValue(value);
                            //             selectedItemIdx = idx;
                            //             setIsOpen(false);
                            //             break;
                            //         }
                            //         default: {
                            //             break;
                            //         }
                            //     }
                            // }}
                        >
                            {value}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
