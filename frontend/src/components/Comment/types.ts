import type { Comment, CommentMetrics } from "@/types/comment";

export interface CommentUserData {
    id: string;
    username: string;
    avatar?: string;
}

export interface CommentObject {
    userData: CommentUserData;
    comment: Comment;
    metrics: CommentMetrics;
}
