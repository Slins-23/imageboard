"use client";

import gradientNavbarStyle from "./gradientNavbar.module.css";
import {
    useState,
    useRef,
    useCallback,
    useEffect,
    type HTMLAttributes,
    type LiHTMLAttributes,
} from "react";
import type { NavigationItem } from "@/ui/types/navigation";
import clsx from "clsx";

interface GradientNavbarArgs extends HTMLAttributes<HTMLDivElement> {
    currentRoute: string;
    onItemSelected?: (item: NavigationItem) => void;
    title: string;
    items: NavigationItem[];
    listProps?: HTMLAttributes<HTMLUListElement>;
    itemProps?: LiHTMLAttributes<HTMLLIElement>;
    titleProps?: HTMLAttributes<HTMLSpanElement>;
}

export default function GradientNavbar({
    currentRoute,
    onItemSelected,
    title,
    items,
    listProps,
    itemProps,
    titleProps,
    ...props
}: GradientNavbarArgs) {
    const currentRouteIdx = items.findIndex(
        (item) => item.route === currentRoute
    );
    const [focusedIdx, setFocusedIdx] = useState(() =>
        Math.max(currentRouteIdx, 0)
    );

    const menuOptionsRefs = useRef<HTMLLIElement[]>([]);

    const setItemRef = useCallback(
        (element: HTMLLIElement | null, index: number) => {
            if (!element) return;

            menuOptionsRefs.current[index] = element;
        },
        []
    );

    const focusItem = (idx: number) => {
        const element = menuOptionsRefs.current[idx];

        element?.focus();

        setFocusedIdx(idx);
    };

    useEffect(
        () => setFocusedIdx(Math.max(currentRouteIdx, 0)),
        [currentRouteIdx]
    );

    return (
        <nav
            {...props}
            className={clsx(gradientNavbarStyle.navbar, props.className)}
        >
            <header>
                <span
                    {...titleProps}
                    className={clsx(
                        gradientNavbarStyle.title,
                        titleProps?.className
                    )}
                >
                    {title}
                </span>
            </header>
            <ul
                role="menu"
                {...listProps}
            >
                {items.map((item: NavigationItem, idx: number) => (
                    <li
                        role="menuitem"
                        data-text={item.text}
                        aria-current={
                            idx === currentRouteIdx ? "page" : undefined
                        }
                        tabIndex={focusedIdx === idx ? 0 : -1}
                        {...itemProps}
                        ref={(element) => setItemRef(element, idx)}
                        key={item.route}
                        onClick={(event) => {
                            event.preventDefault();

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

                                    focusItem(nextIdx);

                                    break;
                                }
                                case "Tab":
                                case "ArrowDown": {
                                    event.preventDefault();

                                    if (focusedIdx === items.length - 1) {
                                        focusItem(0);
                                    } else {
                                        const nextIdx = Math.min(
                                            idx + 1,
                                            items.length - 1
                                        );

                                        focusItem(nextIdx);
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
