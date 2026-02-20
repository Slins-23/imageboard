import { useControllableState } from "@/utils/utils";
import notificationStyle from "./notification.module.css";
import { type HTMLAttributes } from "react";

export interface NotificationArgs extends HTMLAttributes<HTMLDivElement> {
    count?: number;
    defaultCount?: number;
    onCountChange?: (count: number) => void;
    onCount?: (count?: number) => void;
}

export default function NotificationCount({
    count = undefined,
    defaultCount = 0,
    onCountChange = undefined,
    ...args
}: NotificationArgs) {
    const [internalCount] = useControllableState<number>({
        defaultValue: defaultCount,
        value: count,
        onChange: onCountChange,
    });

    return (
        <div
            className={`${notificationStyle.notificationCount}`}
            {...args}
        >
            {internalCount}
        </div>
    );
}
