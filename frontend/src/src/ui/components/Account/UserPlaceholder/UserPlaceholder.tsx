import placeholderStyle from "./UserPlaceholder.module.css";
import {
    FontAwesomeIcon,
    FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import type { HTMLAttributes } from "react";
import clsx from "clsx";

interface userPlaceholderArgs extends HTMLAttributes<HTMLDivElement> {
    size?: string;
    iconWidthScale?: number;
    iconHeightScale?: number;
    wrapperProps?: HTMLAttributes<HTMLDivElement>;
    iconProps?: FontAwesomeIconProps;
}

export default function UserPlaceholder({
    size = "200px",
    iconWidthScale = 1,
    iconHeightScale = 1,
    wrapperProps,
    iconProps,
}: userPlaceholderArgs) {
    return (
        <div
            {...wrapperProps}
            className={clsx(
                placeholderStyle["avatar-card"],
                wrapperProps?.className
            )}
            style={{ width: size, height: size, ...wrapperProps?.style }}
        >
            <FontAwesomeIcon
                icon={faUser}
                {...iconProps}
                style={{
                    fontSize: `${Number.parseInt(size) * 0.625}px`,
                    scale: `${iconWidthScale} ${iconHeightScale}`,
                    marginTop: "-0.2rem",
                    ...iconProps?.style,
                }}
            />
        </div>
    );
}
