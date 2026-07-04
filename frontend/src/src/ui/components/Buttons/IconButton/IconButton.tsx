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
import type { MouseEvent, ButtonHTMLAttributes } from "react";

interface IconButtonArgs extends ButtonHTMLAttributes<HTMLButtonElement> {
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
}

export default function IconButton({
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
}: IconButtonArgs) {
    const [internalIsActive, setInternalIsActive] =
        useControllableState<boolean>({
            value: isActive,
            defaultValue: defaultActive,
            onChange: onActiveChange,
        });

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (props.disabled) return;

        props?.onClick?.(event);

        if (event.defaultPrevented) return;

        if (!internalIsActive) setInternalIsActive(true);
    };

    return (
        <button
            type="button"
            className={buttonStyle.iconButton}
            aria-pressed={isActive === undefined ? false : internalIsActive}
            {...props}
            style={{ width, height, ...props.style }}
            onClick={handleClick}
        >
            <FontAwesomeIcon
                icon={icon}
                {...props.iconProps}
                style={{
                    ...(iconSize === undefined ? {} : { fontSize: iconSize }),
                    ...(iconWidthScale === undefined ||
                    iconHeightScale === undefined
                        ? {}
                        : { scale: `${iconWidthScale} ${iconHeightScale}` }),
                    color: "var(--accent)",
                    ...props.iconProps?.style,
                }}
            />

            {hasNotifications && <NotificationCount {...notificationProps} />}
        </button>
    );
}
