import placeholderStyle from "./userPlaceholder.module.css";
import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import type { HTMLAttributes } from "react";

interface userPlaceholderArgs extends HTMLAttributes<HTMLDivElement> {
    width?: string;
    height?: string;
    iconSize?: string;
    iconWidthScale?: number;
    iconHeightScale?: number;
    cardProps?: HTMLAttributes<HTMLDivElement>;
    iconProps?: FontAwesomeIconProps;
}

export default function UserPlaceholder({
    width = "200px",
    height = "200px",
    iconSize = "125px",
    iconWidthScale = 1,
    iconHeightScale = 1,
    ...props
}: userPlaceholderArgs) {
    return (
        <div
            {...props.cardProps}
            className={`${placeholderStyle["avatar-card"]}`}
            style={{ width, height }}
        >
            <FontAwesomeIcon
                {...props.iconProps}
                className={`${placeholderStyle["avatar-icon"]}`}
                icon={faUser}
                style={{
                    fontSize: iconSize,
                    scale: `${iconWidthScale} ${iconHeightScale}`,
                }}
            />
        </div>
    );
}
