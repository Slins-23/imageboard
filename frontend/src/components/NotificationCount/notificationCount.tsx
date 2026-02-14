import notificationStyle from "./notification.module.css";
import { type HTMLAttributes } from "react";

export interface NotificationArgs extends HTMLAttributes<HTMLDivElement> {
    count?: number;
    width?: string;
    height?: string;
    fontSize?: string;
}

export default function NotificationCount({
    count = 0,
    width = "1rem",
    height = "1rem",
    fontSize = "0.5rem",
    ...args
}: NotificationArgs) {
    return (
        <div
            className={`${notificationStyle.notificationCount}`}
            style={{
                width,
                height,
                fontSize,
            }}
            {...args}
        >
            {count}
        </div>
    );
}
