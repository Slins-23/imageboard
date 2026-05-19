export interface Follow {
    id: string;
    follower: string;
    target: string;
    followed_at: number;
}

export interface FollowMetrics {
    id: string;
    follows: number;
    followers: number;
}
