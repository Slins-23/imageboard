import placeholderStyle from "./userPlaceholder.module.css";
import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import type { HTMLAttributes } from "react";

interface userPlaceholderArgs extends HTMLAttributes<HTMLDivElement> {
    size?: string;
    iconWidthScale?: number;
    iconHeightScale?: number;
    cardProps?: HTMLAttributes<HTMLDivElement>;
    iconProps?: FontAwesomeIconProps;
}

export default function UserPlaceholder({
    size = "200px",
    iconWidthScale = 1,
    iconHeightScale = 1,
    ...props
}: userPlaceholderArgs) {
    return (
        <div
            className={placeholderStyle["avatar-card"]}
            {...props.cardProps}
            style={{ width: size, height: size, ...props.cardProps?.style }}
        >
            <FontAwesomeIcon
                className={placeholderStyle["avatar-icon"]}
                icon={faUser}
                {...props.iconProps}
                style={{
                    fontSize: `${Number.parseInt(size) * 0.625}px`,
                    scale: `${iconWidthScale} ${iconHeightScale}`,
                    marginTop: "-0.2rem",
                    ...props.iconProps?.style,
                }}
            />
        </div>
    );
}
