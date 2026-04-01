export interface PostLike {
    id: string;
    liked_by: string;
    post: string;
    liked_at: number;
}

export interface CommentLike {
    id: string;
    liked_by: string;
    comment: string;
    liked_at: number;
}
