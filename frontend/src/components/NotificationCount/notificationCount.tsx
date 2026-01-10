import notificationStyle from "./notification.module.css";

interface notificationArgs {
    count?: number;
    width?: string;
    height?: string;
    fontSize?: string;
}

export default function NotificationCount({
    count = 0,
    width = "16px",
    height = "16px",
    fontSize = "8px",
}: notificationArgs) {
    return (
        <div
            className={`${notificationStyle.notificationCount}`}
            style={{
                width,
                height,
                fontSize,
            }}
        >
            {count}
        </div>
    );
}
