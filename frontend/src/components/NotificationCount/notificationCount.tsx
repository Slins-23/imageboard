import notificationStyle from "./notification.module.css";

export default function NotificationCount({ count }: { count: number }) {
    return (
        <div className={`${notificationStyle.notificationCount}`}>{count}</div>
    );
}
