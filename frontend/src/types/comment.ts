export interface Comment {
    id: string;
    posted_by: string;
    post: string;
    reply_to?: string;
    message: string;
    created_at: number;
}

export interface CommentMetric {
    id: string;
    likes: number;
    replies: number;
}
