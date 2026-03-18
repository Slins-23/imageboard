export interface Notification {
    id: string;
    type: "like" | "follow" | "comment" | "reply"; // Eventually add more as needed
    message: string;
    from_post?: string;
    username?: string;
    avatar?: string;
    comment?: string;
    preview?: string; // Max 100ch or so
    created_at: number;
}

export interface UnitcastNotification extends Notification {
    recipient_id: string;
}

export interface BroadcastNotification extends Notification {
    actor_id: string;
}

export interface NotificationMetrics {
    id: string;
    unread: number;
}
