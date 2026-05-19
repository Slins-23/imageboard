export interface Album {
    id: string;
    owner: string;
    title: string;
    cover: string;
    total_images: number;
    last_update: number;
    created_at: number;
}

export interface AlbumPost {
    id: string;
    album: string;
    post: string;
    added_at: number;
}
