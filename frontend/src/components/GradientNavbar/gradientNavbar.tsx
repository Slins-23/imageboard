"use client";

import Link from "next/link";
import gradientNavbarStyle from "./gradientNavbar.module.css";
import {
    useState,
    useRef,
    useCallback,
    useEffect,
    type HTMLAttributes,
    type LiHTMLAttributes,
} from "react";
import { usePathname } from "next/navigation";

export interface NavigationItem {
    text: string;
    route: string;
}

export type NavigationItems = Array<Readonly<NavigationItem>>;

interface GradientNavbarArgs {
    title: string;
    items: NavigationItems;
    listProps?: HTMLAttributes<HTMLUListElement>;
    itemProps?: LiHTMLAttributes<HTMLLIElement>;
}

export default function GradientNavbar({
    title,
    items,
    listProps,
    itemProps,
    ...args
}: GradientNavbarArgs) {
    const slug = usePathname();
    // const currentRouteIdx = items.findIndex((item) => item.route === slug);

    const menuOptionsRefs = useRef<(HTMLLIElement | null)[]>([]);
    const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    const [currentRouteIdx, setCurrentRouteIdx] = useState<number>(() =>
        items.findIndex((item) => item.route === slug)
    );

    useEffect(() => {
        setCurrentRouteIdx(items.findIndex((item) => item.route === slug));
    }, [slug]);

    const setItemRef = useCallback(
        (element: HTMLLIElement | null, index: number) => {
            if (!menuOptionsRefs.current) return;

            if (element && !menuOptionsRefs.current.includes(element)) {
                menuOptionsRefs.current[index] = element;
            }
        },
        []
    );

    const setLinkRef = useCallback(
        (element: HTMLAnchorElement | null, index: number) => {
            if (!linkRefs.current) return;

            if (element && !linkRefs.current.includes(element)) {
                linkRefs.current[index] = element;
            }
        },
        []
    );

    return (
        <nav
            className={gradientNavbarStyle.navbar}
            {...args}
        >
            <header>
                <h1 className={gradientNavbarStyle.title}>{title}</h1>
            </header>
            <ul
                role="listbox"
                {...listProps}
            >
                {items.map((item: NavigationItem, idx: number) => (
                    <li
                        role="option"
                        data-text={item.text}
                        tabIndex={0}
                        aria-selected={idx === currentRouteIdx}
                        {...itemProps}
                        ref={(element) => setItemRef(element, idx)}
                        key={item.route}
                        onClick={(event) => {
                            event.preventDefault();
                            linkRefs.current[idx]?.click();
                        }}
                        onKeyDown={(event) => {
                            switch (event.code) {
                                case "Enter":
                                case "Space": {
                                    event.preventDefault();
                                    linkRefs.current[idx]?.click();
                                    break;
                                }
                                case "ArrowUp": {
                                    event.preventDefault();
                                    const elementAbove =
                                        idx > 0
                                            ? menuOptionsRefs.current[idx - 1]
                                            : menuOptionsRefs.current[idx];
                                    elementAbove?.focus();
                                    break;
                                }
                                case "ArrowDown": {
                                    event.preventDefault();
                                    const elementBelow =
                                        idx < items.length - 1
                                            ? menuOptionsRefs.current[idx + 1]
                                            : menuOptionsRefs.current[idx];
                                    elementBelow?.focus();
                                    break;
                                }
                                default: {
                                    break;
                                }
                            }
                        }}
                    >
                        <Link
                            ref={(element) => setLinkRef(element, idx)}
                            tabIndex={-1}
                            href={item.route}
                            onClick={() => setCurrentRouteIdx(idx)}
                        >
                            {item.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
