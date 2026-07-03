"use client";

import useControllableState from "@/ui/hooks/useControllableState";
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
    ...props
}: NotificationArgs) {
    const [internalCount] = useControllableState<number>({
        defaultValue: defaultCount,
        value: count,
        onChange: onCountChange,
    });

    return (
        <div
            className={notificationStyle.notificationCount}
            {...props}
        >
            {internalCount}
        </div>
    );
}
