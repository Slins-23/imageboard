import buttonStyle from "./iconButton.module.css";
import {
    FontAwesomeIcon,
    type FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import NotificationCount, {
    type NotificationArgs,
} from "@/components/NotificationCount/notificationCount";
import { useControllableState } from "@/utils/utils";
import type { MouseEvent, ButtonHTMLAttributes } from "react";

interface IconButtonArgs extends ButtonHTMLAttributes<HTMLButtonElement> {
    isActive?: boolean;
    defaultActive?: boolean;
    onActiveChange?: (isActive: boolean) => void;
    btnIcon?: IconProp;
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
    btnIcon = faHouse,
    width = "50px",
    height = "50px",
    iconSize = "25px",
    iconWidthScale = 1,
    iconHeightScale = 1,
    hasNotifications = false,
    onActiveChange = undefined,
    ...args
}: IconButtonArgs) {
    const [internalIsActive, setInternalIsActive] =
        useControllableState<boolean>({
            value: isActive,
            defaultValue: defaultActive,
            onChange: onActiveChange,
        });

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (args.disabled) return;

        args?.onClick?.(event);

        if (event.defaultPrevented) return;

        if (!internalIsActive) setInternalIsActive(true);
    };

    return (
        <button
            type="button"
            className={buttonStyle.iconButton}
            aria-pressed={internalIsActive}
            {...args}
            style={{ width, height, ...args.style }}
            onClick={handleClick}
        >
            <FontAwesomeIcon
                icon={btnIcon}
                {...args.iconProps}
                style={{
                    ...(iconSize === undefined ? {} : { fontSize: iconSize }),
                    ...(iconWidthScale === undefined ||
                    iconHeightScale === undefined
                        ? {}
                        : { scale: `${iconWidthScale} ${iconHeightScale}` }),
                    color: "var(--accent)",
                    ...args.iconProps?.style,
                }}
            />

            {hasNotifications && (
                <NotificationCount {...args.notificationProps} />
            )}
        </button>
    );
}
