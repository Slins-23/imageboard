import userMenuStyle from "./UserMenu.module.css";
// import Link from "next/link";
import type { NavigationItem } from "@/ui/types/navigation";
import {
    useCallback,
    useEffect,
    // useEffect,
    useRef,
    useState,
    type MouseEvent,
    type KeyboardEvent,
    type ComponentPropsWithoutRef,
} from "react";
import clsx from "clsx";

interface UserMenuProps {
    currentRoute: string;
    onItemSelected?: (item: NavigationItem) => void;
    items: NavigationItem[];
    listProps?: ComponentPropsWithoutRef<"ul">;
    itemProps?: ComponentPropsWithoutRef<"li">;
    navProps?: ComponentPropsWithoutRef<"nav">;
}

export default function UserMenu({
    currentRoute,
    onItemSelected,
    items,
    listProps,
    itemProps,
    navProps,
}: UserMenuProps) {
    const menuOptionsRefs = useRef<HTMLLIElement[]>([]);

    const currentRouteIdx = items.findIndex(
        (item) => item.route === currentRoute
    );
    const [focusedIdx, setFocusedIdx] = useState(() =>
        Math.max(currentRouteIdx, 0)
    );

    /*
    const [currentRouteIdx, setCurrentRouteIdx] = useState<number>(() =>
        items.findIndex((item: NavigationItem) => item.route === slug)
    );

    useEffect(() => {
        setCurrentRouteIdx(items.findIndex((item) => item.route === slug));
    }, [slug]);
    */

    const setItemRef = useCallback(
        (element: HTMLLIElement | null, index: number) => {
            if (!element) return;

            menuOptionsRefs.current[index] = element;
        },
        []
    );

    const focusElement = (idx: number) => {
        const element = menuOptionsRefs.current[idx];

        setFocusedIdx(idx);

        element?.focus();
    };

    useEffect(
        () => setFocusedIdx(Math.max(currentRouteIdx, 0)),
        [currentRouteIdx]
    );

    const handleClick = (
        event: MouseEvent<HTMLLIElement>,
        item: NavigationItem,
        idx: number
    ) => {
        event.preventDefault();

        focusElement(idx);

        onItemSelected?.(item);
    };

    const handleKeyDown = (
        event: KeyboardEvent<HTMLLIElement>,
        item: NavigationItem,
        idx: number
    ) => {
        switch (event.key) {
            case "Enter":
            case " ": {
                event.preventDefault();

                onItemSelected?.(item);

                break;
            }

            case "ArrowUp": {
                event.preventDefault();

                const nextIdx = Math.max(0, idx - 1);

                focusElement(nextIdx);

                break;
            }
            case "Tab":
            case "ArrowDown": {
                event.preventDefault();

                if (focusedIdx === items.length - 1) {
                    focusElement(0);
                } else {
                    const nextIdx = Math.min(idx + 1, items.length - 1);

                    focusElement(nextIdx);
                }

                break;
            }
            default: {
                break;
            }
        }
    };

    return (
        <nav
            {...navProps}
            className={clsx(userMenuStyle.wrapper, navProps?.className)}
        >
            <ul
                role="menu"
                {...listProps}
                className={clsx(userMenuStyle.menu, listProps?.className)}
            >
                {items.map((item: NavigationItem, idx: number) => (
                    <li
                        role="menuitem"
                        {...itemProps}
                        data-text={item.text}
                        aria-current={
                            currentRouteIdx !== -1 && idx === currentRouteIdx
                        }
                        tabIndex={idx === focusedIdx ? 0 : -1}
                        ref={(element) => setItemRef(element, idx)}
                        key={item.route}
                        onClick={(event) => handleClick(event, item, idx)}
                        onKeyDown={(event) => handleKeyDown(event, item, idx)}
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
