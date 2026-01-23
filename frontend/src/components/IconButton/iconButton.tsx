import buttonStyle from "./iconButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import NotificationCount from "@/components/NotificationCount/notificationCount";
import { useControllableState } from "@/utils/utils";
import type { MouseEvent } from "react";

interface IconButtonArgs {
    isActive?: boolean;
    defaultActive?: boolean;
    onActiveChange?: (isActive: boolean) => void;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    ariaLabel?: string;
    btnIcon?: IconProp;
    width?: string;
    height?: string;
    iconSize?: string;
    iconWidthScale?: number;
    iconHeightScale?: number;
    hasNotifications?: boolean;
    unreadNotifications?: number;
}

export default function IconButton({
    isActive = undefined,
    defaultActive = false,
    btnIcon = faHouse,
    ariaLabel = "Home button",
    width = "50px",
    height = "50px",
    iconSize = "25px",
    iconWidthScale = 1,
    iconHeightScale = 1,
    hasNotifications = false,
    unreadNotifications = 0,
    onActiveChange = undefined,
    onClick = undefined,
}: IconButtonArgs) {
    const [internalIsActive, setInternalIsActive] =
        useControllableState<boolean>({
            value: isActive,
            defaultValue: defaultActive,
            onChange: onActiveChange,
        });

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);

        if (event.defaultPrevented) return;

        if (!internalIsActive) setInternalIsActive(true);
    };

    return (
        <button
            type="button"
            className={`${buttonStyle.iconButton}`}
            style={{ width, height }}
            aria-label={ariaLabel}
            aria-pressed={internalIsActive}
            onClick={handleClick}
        >
            <FontAwesomeIcon
                icon={btnIcon}
                style={{
                    fontSize: iconSize,
                    scale: `${iconWidthScale} ${iconHeightScale}`,
                    color: "var(--accent)",
                }}
            />

            {hasNotifications && (
                <NotificationCount count={unreadNotifications} />
            )}
        </button>
    );
}
