export interface Comment {
    id: string;
    posted_by: string;
    post: string;
    reply_to?: string;
    text: string;
    created_at: number;
}

export interface CommentMetrics {
    id: string;
    likes: number;
    replies: number;
}
