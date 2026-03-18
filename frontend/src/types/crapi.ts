// Centralized Registry API (Globally accessible, centralized, mostly static data with rare appends and even rarer updates)

export interface Country {
    id: number;
    name: string;
    iso_code: string;
    created_at: number;
}

export interface Language {
    id: number;
    country: number;
    name: string;
    iso_code: string;
    created_at: number;
}

export interface TaggingModel {
    id: number;
    name: string;
    created_at: number;
}
