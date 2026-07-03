export interface PostBody {
    id: string;
    owner: string;
    image: string;
    original_width: number;
    original_height: number;
    feed_width?: number;
    feed_height?: number;
    blurhash_full: string;
    blurhash_feed?: string;
    created_at: number;
}

export interface PostMetrics {
    id: string;
    likes: number;
    comments: number;
    views: number;
}

export interface PostTag {
    id: string;
    name: string;
    thumbnail?: string;
    created_at: number;
}

export interface PostCorrelation {
    id: string;
    post: string;
    tag: string;
    correlation: number;
    model_version: string;
    calculated_at: number;
}
