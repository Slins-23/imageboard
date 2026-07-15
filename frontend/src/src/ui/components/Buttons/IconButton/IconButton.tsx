"use client";

import buttonStyle from "./IconButton.module.css";
import {
    FontAwesomeIcon,
    type FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import NotificationCount, {
    type NotificationProps,
} from "@/ui/components/Indicators/NotificationCount/NotificationCount";
import useControllableState from "@/ui/hooks/useControllableState";
import type {
    MouseEvent,
    KeyboardEvent,
    ElementType,
    ComponentPropsWithoutRef,
    SetStateAction,
    Dispatch,
} from "react";
import clsx from "clsx";

export type IconButtonProps<C extends ElementType = "button"> = {
    as?: C;
    isActive?: boolean;
    defaultActive?: boolean;
    onActiveChange?: Dispatch<SetStateAction<boolean>>;
    icon?: IconProp;
    width?: string;
    height?: string;
    iconSize?: string;
    iconWidthScale?: number;
    iconHeightScale?: number;
    hasNotifications?: boolean;
    iconProps?: FontAwesomeIconProps;
    notificationProps?: NotificationProps;
} & ComponentPropsWithoutRef<C>;

export default function IconButton<C extends ElementType = "button">({
    as,
    isActive,
    defaultActive = false,
    icon = faHouse,
    width = "50px",
    height = "50px",
    iconSize = "25px",
    iconWidthScale = 1,
    iconHeightScale = 1,
    hasNotifications = false,
    onActiveChange,
    notificationProps,
    ...props
}: IconButtonProps<C>) {
    const Component = (as || "button") as ElementType;

    const p = props as ComponentPropsWithoutRef<"button">;

    const [internalIsActive, setInternalIsActive] =
        useControllableState<boolean>({
            value: isActive,
            defaultValue: defaultActive,
            onChange: onActiveChange,
        });

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        if (p.disabled) return;

        p?.onClick?.(event as MouseEvent<HTMLButtonElement>);

        if (!internalIsActive) setInternalIsActive(true);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (p.disabled) return;

        p?.onKeyDown?.(event as KeyboardEvent<HTMLButtonElement>);

        switch (event.key) {
            case " ": {
                event.preventDefault();

                (event.currentTarget as HTMLElement).click();

                // handleTrigger(event);
                break;
            }
            default: {
                break;
            }
        }
    };

    return (
        <Component
            type="button"
            aria-pressed={isActive === undefined ? false : internalIsActive}
            {...props}
            className={clsx(buttonStyle.iconButton, p.className)}
            style={{ width, height, ...p.style }}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <FontAwesomeIcon
                icon={icon}
                {...props.iconProps}
                style={{
                    ...(iconSize === undefined
                        ? {}
                        : { width: iconSize, height: iconSize }),
                    ...(iconWidthScale === undefined ||
                    iconHeightScale === undefined
                        ? {}
                        : {
                              scale: `${iconWidthScale} ${iconHeightScale}`,
                          }),
                    color: "var(--accent)",
                    ...props.iconProps?.style,
                }}
            />

            {hasNotifications && <NotificationCount {...notificationProps} />}
        </Component>
    );
}
