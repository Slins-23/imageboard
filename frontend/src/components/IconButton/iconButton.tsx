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

interface IconButtonArgs {
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
    buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
    iconProps?: FontAwesomeIconProps;
    notificationProps?: NotificationArgs;
}

export default function IconButton({
    isActive = undefined,
    defaultActive = false,
    btnIcon = faHouse,
    width = "3.125rem",
    height = "3.125rem",
    iconSize = "1.5625rem",
    iconWidthScale = 1,
    iconHeightScale = 1,
    hasNotifications = false,
    onActiveChange = undefined,
    ...props
}: IconButtonArgs) {
    const [internalIsActive, setInternalIsActive] =
        useControllableState<boolean>({
            value: isActive,
            defaultValue: defaultActive,
            onChange: onActiveChange,
        });

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (props.buttonProps?.disabled) return;

        props.buttonProps?.onClick?.(event);

        if (event.defaultPrevented) return;

        if (!internalIsActive) setInternalIsActive(true);
    };

    return (
        <button
            type="button"
            className={`${buttonStyle.iconButton}`}
            style={{ width, height }}
            aria-pressed={internalIsActive}
            {...props.buttonProps}
            onClick={handleClick}
        >
            <FontAwesomeIcon
                icon={btnIcon}
                style={{
                    ...(iconSize === undefined ? {} : { fontSize: iconSize }),
                    ...(iconWidthScale === undefined ||
                    iconHeightScale === undefined
                        ? {}
                        : { scale: `${iconWidthScale} ${iconHeightScale}` }),
                    color: "var(--accent)",
                }}
                {...props.iconProps}
            />

            {hasNotifications && (
                <NotificationCount {...props.notificationProps} />
            )}
        </button>
    );
}
