import placeholderStyle from "./userPlaceholder.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface userPlaceholderArgs {
    width: string;
    height: string;
    iconSize: string;
    iconWidthScale: number;
    iconHeightScale: number;
}

export default function UserPlaceholder({
    width = "200px",
    height = "200px",
    iconSize = "125px",
    iconWidthScale = 1,
    iconHeightScale = 1,
}: userPlaceholderArgs) {
    return (
        <div
            className={`${placeholderStyle["avatar-card"]}`}
            style={{ width, height }}
        >
            <FontAwesomeIcon
                icon={faUser}
                style={{
                    fontSize: iconSize,
                    scale: `${iconWidthScale} ${iconHeightScale}`,
                }}
            />
        </div>
    );
}
