import buttonStyle from "./iconButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import NotificationCount from "@/components/NotificationCount/notificationCount";

interface iconButtonArgs {
    btnId: string;
    ariaLabel: string;
    btnIcon: IconProp;
    isActive: boolean;
    width: string;
    height: string;
    iconSize: string;
    iconWidthScale: number;
    iconHeightScale: number;
    hasNotifications: boolean;
    unreadNotifications: number;
}

export default function iconButton({
    btnId = "home",
    ariaLabel = "home",
    btnIcon = faHouse,
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
            type={"button"}
            id={btnId}
            className={
                `${buttonStyle.iconButton}` +
                ` ` +
                (isActive && `${buttonStyle["iconButton--active"]}`)
            }
            style={{ width, height }}
            aria-label={`${ariaLabel}`}
        >
            <FontAwesomeIcon
                icon={btnIcon}
                color="var(--accent)"
                style={{
                    fontSize: iconSize,
                    scale: `${iconWidthScale} ${iconHeightScale}`,
                }}
            />

            {hasNotifications && (
                <NotificationCount count={unreadNotifications} />
            )}
        </button>
    );
}
