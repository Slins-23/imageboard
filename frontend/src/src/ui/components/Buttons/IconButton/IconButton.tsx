"use client";

import buttonStyle from "./IconButton.module.css";
import {
    FontAwesomeIcon,
    type FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import NotificationCount, {
    type NotificationArgs,
} from "@/ui/components/Indicators/NotificationCount/NotificationCount";
import useControllableState from "@/ui/hooks/useControllableState";
import type {
    MouseEvent,
    KeyboardEvent,
    ButtonHTMLAttributes,
    ReactNode,
    ElementType,
    ComponentPropsWithoutRef,
} from "react";

type IconButtonProps<Component extends ElementType> = {
    as?: Component;
    isActive?: boolean;
    defaultActive?: boolean;
    onActiveChange?: (isActive: boolean) => void;
    icon?: IconProp;
    width?: string;
    height?: string;
    iconSize?: string;
    iconWidthScale?: number;
    iconHeightScale?: number;
    hasNotifications?: boolean;
    iconProps?: FontAwesomeIconProps;
    notificationProps?: NotificationArgs;
} & ComponentPropsWithoutRef<Component>;

export default function IconButton<Component extends ElementType>({
    as,
    isActive = undefined,
    defaultActive = false,
    icon = faHouse,
    width = "50px",
    height = "50px",
    iconSize = "25px",
    iconWidthScale = 1,
    iconHeightScale = 1,
    hasNotifications = false,
    onActiveChange = undefined,
    notificationProps = undefined,
    ...props
}: IconButtonProps<Component>) {
    const Component = as ?? "button";

    const [internalIsActive, setInternalIsActive] =
        useControllableState<boolean>({
            value: isActive,
            defaultValue: defaultActive,
            onChange: onActiveChange,
        });

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        if (props.disabled) return;

        props?.onClick?.(event);

        if (!internalIsActive) setInternalIsActive(true);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (props.disabled) return;

        props?.onKeyDown?.(event);

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
            className={buttonStyle.iconButton}
            aria-pressed={isActive === undefined ? false : internalIsActive}
            {...props}
            style={{ width, height, ...props.style }}
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
