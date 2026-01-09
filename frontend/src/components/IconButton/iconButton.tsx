import buttonStyle from "./iconButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import NotificationCount from "@/components/NotificationCount/notificationCount";

interface iconButtonArgs {
    ariaLabel?: string;
    isActive?: boolean;
    btnIcon?: IconProp;
    width?: string;
    height?: string;
    iconSize?: string;
    iconWidthScale?: number;
    iconHeightScale?: number;
    hasNotifications?: boolean;
    unreadNotifications?: number;
    onClick?: (event: Event) => void;
}

export default function iconButton({
    btnIcon = faHouse,
    ariaLabel = "Home button",
    isActive = false,
    width = "50px",
    height = "50px",
    iconSize = "25px",
    iconWidthScale = 1,
    iconHeightScale = 1,
    hasNotifications = false,
    unreadNotifications = 0,
}: iconButtonArgs) {
    return (
        <button
            type="button"
            className={
                `${buttonStyle.iconButton}` +
                (isActive ? ` ${buttonStyle["iconButton--active"]}` : ``)
            }
            style={{ width, height }}
            aria-label={ariaLabel}
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
