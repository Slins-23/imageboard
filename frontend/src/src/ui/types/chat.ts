export interface Chat {
    id: string;
    user_a: string;
    user_b: string;
    unread_a: number;
    unread_b: number;
    created_at: number;
}

export interface ChatMessage {
    id: string;
    chat: string;
    message: string;
    from: string;
    to: string;
    sent_at: number;
}

export interface ChatMetrics {
    id: string;
    unread: number;
}
