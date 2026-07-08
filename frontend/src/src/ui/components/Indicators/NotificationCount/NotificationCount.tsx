"use client";

import useControllableState from "@/ui/hooks/useControllableState";
import notificationStyle from "./NotificationCount.module.css";
import type { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";

export interface NotificationProps extends ComponentPropsWithoutRef<"div"> {
    count?: number;
    defaultCount?: number;
    onCountChange?: Dispatch<SetStateAction<number>>;
}

export default function NotificationCount({
    count,
    defaultCount = 0,
    onCountChange,
    ...props
}: NotificationProps) {
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
