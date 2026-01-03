import dropdownStyle from "./dropdownMenu.module.css";
import { useState, useEffect, useRef, useLayoutEffect, useId } from "react";

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

    const dropdownId = useId();

    const currentWindowWidth = useRef(0);
    const currentWindowHeight = useRef(0);

    useEffect(() => {
        currentWindowWidth.current = window.innerWidth;
        currentWindowHeight.current = window.innerHeight;
    }, []);

    useLayoutEffect(() => {
        const listElement = listRef.current;
        if (!listElement) return undefined;

        const currentWidth = listElement.getBoundingClientRect().width;
        const finalWidth =
            window.innerWidth <= currentWidth
                ? window.innerWidth - 50
                : currentWidth;

        for (let i = 0; i < itemRefs.current?.length; i++) {
            const itemRef = itemRefs.current[i];

            if (itemRef) {
                itemRef.style.width = `${finalWidth}px`;
            }
        }
        setMenuWidth(`${finalWidth}px`);

        const observer = new ResizeObserver((entries) => {
            /*
            for (const entry of entries) {
                setMenuWidth(`${entry.contentRect.width}px`);
            }
                */
            // setMenuWidth(`${entries[0].contentRect.width}px`);
            // setMenuWidth(`${entries[0].borderBoxSize[0].inlineSize}px`);
        });

        observer.observe(listElement);

        const handleResize = (event: Event) => {
            console.log("Resize function triggered (handleResize)");
            if (listElement) {
                const previousWindowWidth = currentWindowWidth.current;
                const previousWindowHeight = currentWindowHeight.current;

                currentWindowWidth.current = window.innerWidth;
                currentWindowHeight.current = window.innerHeight;

                const dWidth = currentWindowWidth.current - previousWindowWidth;
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

                listElement.style.width = `${listElement.getBoundingClientRect().width + dWidth}px`;

                /*
                const currentWidth = listElement.getBoundingClientRect().width;
                const finalWidth =
                    window.innerWidth <= currentWidth
                        ? window.innerWidth - 50
                        : currentWidth;
                */

                for (let i = 0; i < itemRefs.current?.length; i++) {
                    const itemRef = itemRefs.current[i];

                    if (itemRef) {
                        // itemRef.style.width = `${finalWidth}px`;
                        itemRef.style.width = listElement.style.width;
                    }
                }
                // setMenuWidth(`${finalWidth}px`);
                setMenuWidth(listElement.style.width);
            }
        };

        if (listRef.current) {
            const width = listRef.current.getBoundingClientRect().width;
            setMenuWidth(`${width}px`);
        }

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

    return (
        <div
            ref={rootNode}
            className={dropdownStyle.wrapper}
            style={{ width: menuWidth, fontSize: "1rem" }}
        >
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
                className={dropdownStyle.select}
                style={{
                    borderBottomColor: isOpen
                        ? "transparent"
                        : "var(--tertiary)",
                }}
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
                        >
                            {value}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
