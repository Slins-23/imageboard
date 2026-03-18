export interface Image {
    id: string;
    owner: string;
    original_width: number;
    original_height: number;
    feed_width?: number;
    feed_height?: number;
    blurhash_full: string;
    blurhash_feed?: string;
    created_at: number;
}
