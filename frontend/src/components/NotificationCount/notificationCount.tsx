import notificationStyle from "./notification.module.css";

export default function NotificationCount({ count = 0 }: { count?: number }) {
    return (
        <div className={`${notificationStyle.notificationCount}`}>{count}</div>
    );
}
