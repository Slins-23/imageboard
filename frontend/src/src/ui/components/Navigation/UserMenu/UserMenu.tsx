import userMenuStyle from "./UserMenu.module.css";
// import Link from "next/link";
import type { NavigationItem } from "@/ui/types/navigation";
import {
    HTMLAttributes,
    LiHTMLAttributes,
    useCallback,
    useEffect,
    // useEffect,
    useRef,
    useState,
} from "react";
import clsx from "clsx";

interface UserMenuArgs {
    currentRoute: string;
    onItemSelected?: (item: NavigationItem) => void;
    items: NavigationItem[];
    listProps?: HTMLAttributes<HTMLUListElement>;
    itemProps?: LiHTMLAttributes<HTMLLIElement>;
}

export default function UserMenu({
    currentRoute,
    onItemSelected,
    items,
    listProps,
    itemProps,
    ...props
}: UserMenuArgs) {
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

    return (
        <nav {...props}>
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
                        onClick={(event) => {
                            event.preventDefault();

                            focusElement(idx);

                            onItemSelected?.(item);
                        }}
                        onKeyDown={(event) => {
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
                                        const nextIdx = Math.min(
                                            idx + 1,
                                            items.length - 1
                                        );

                                        focusElement(nextIdx);
                                    }

                                    break;
                                }
                                default: {
                                    break;
                                }
                            }
                        }}
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
