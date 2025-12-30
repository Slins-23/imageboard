import dropdownStyle from "./dropdownMenu.module.css";
import { useState, useEffect, useRef } from "react";

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

    useEffect(() => {
        if (!isOpen) return;

        function closeDropdown(event: PointerEvent) {
            if (!rootNode.current?.contains(event.target as Node))
                setIsOpen(false);
        }

        document.addEventListener("pointerdown", closeDropdown);

        return () => {
            document.removeEventListener("pointerdown", closeDropdown);
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

        <div ref={rootNode}>
            <button
                onClick={() => {
                    console.log("btn clicked");
                    setIsOpen(!isOpen);
                }}
            >
                {selectedValue} ▼
            </button>
            {isOpen && (
                <ul className={`${dropdownStyle.dropdown}`}>
                    {dropdownEntries.map((entry: DropdownEntry, idx) => {
                        const value: string = entry.value;
                        const callback: (() => void) | undefined =
                            entry.callback;

                        return (
                            <li
                                key={idx}
                                role="option"
                                aria-selected={selectedValue === value}
                                className={`${selectedValue == value ? dropdownStyle.selected : ""}`}
                                value
                                onClick={() => {
                                    if (callback !== undefined) callback();
                                    setValue(value);
                                    setIsOpen(false);
                                }}
                            >
                                {value}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
