export interface UserAuth {
    id: string;
    username: string;
    email: string;
    password: Uint8Array; // Text is hashed client-side and stored as bytea in PostgreSQL
}

export interface UserPII {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    birthdate?: string;
    country?: string;
    language: string;
    gender?: string;
    last_login: number;
    created_at: number;
}

export interface UserPreferenceUI {
    id: string;
    theme: number;
    feed_layout: boolean;
    language: string;
}

export interface UserPreferenceNotifications {
    id: string;
    likes: boolean;
    comments: boolean;
    follows: boolean;
    replies: boolean;
    messages: boolean;
}

export interface UserInterest {
    id: string;
    tag: string;
    interest: number;
    last_update: number;
    added_at: number;
}

export interface UserInbox {
    id: string;
    recipient_id: number;
    notification_id: number;
    created_at: number;
}

export interface PopularUser {
    id: string;
    follower: string;
    target: string;
    added_at: number;
}
