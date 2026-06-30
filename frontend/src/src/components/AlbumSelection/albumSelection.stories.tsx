import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AlbumSelection from "./albumSelection";
import { useArgs } from "storybook/internal/preview-api";
import Tooltip from "@/components/Tooltip/tooltip";
import type {
    AlbumLike,
    AlbumEvent,
    BookmarkEvent,
} from "@/components/AlbumSelection/albumSelection";
import type { Dispatch, SetStateAction } from "react";

const meta: Meta<typeof AlbumSelection> = {
    title: "Components/AlbumSelection",
    component: AlbumSelection,
};

export default meta;

interface MockPost {
    id: string;
    title: string;
}

type MockAlbum = AlbumLike & { randomNumber: number };

const mockPosts: MockPost[] = [
    {
        id: "1",
        title: "FirstPost",
    },
    {
        id: "2",
        title: "SecondPost",
    },
    {
        id: "3",
        title: "ThirdPost",
    },
];

const defaultAlbums: AlbumLike[] = [
    {
        title: "Cars",
        id: "albumIdA",
        cover: "/images/thumb/albumcars.png",
    },
    {
        title: "Contrasting",
        id: "albumIdB",
        cover: "/images/thumb/albumcontrasting.png",
    },
    {
        title: "Cozy images",
        id: "albumIdC",
        cover: "/images/thumb/albumcozyimages.jpg",
    },
    {
        title: "Fantasy",
        id: "albumIdD",
        cover: "/images/thumb/albumfantasy.jpg",
    },
    {
        title: "Nice wallpapers",
        id: "albumIdE",
        cover: "/images/thumb/albumnicewallpapers.png",
    },
    {
        title: "Snowy places",
        id: "albumIdF",
        cover: "/images/thumb/albumsnowyplaces.jpg",
    },
    {
        title: "Unique",
        id: "albumIdG",
        cover: "/images/thumb/albumunique.jpg",
    },
];

const controlledAlbums: MockAlbum[] = defaultAlbums.map(
    (album: AlbumLike): MockAlbum => {
        return {
            ...album,
            randomNumber: Math.random(),
        };
    }
);

const getPost = (postId: string, posts: MockPost[]): MockPost | null => {
    for (const post of posts) {
        if (post.id === postId) return post;
    }

    return null;
};

export const Uncontrolled: StoryObj<typeof meta> = {
    args: {
        postId: "1",
        defaultAlbums,
        onAlbumEvent: (event) => {
            switch (event.type) {
                case "create": {
                    if (event.success) {
                        Tooltip(
                            `Successfully created album "${event.album.title}" (including the post)`
                        );
                    } else {
                        Tooltip(
                            `Could not create album "${event.title}. Error: ${event.error}"`
                        );
                    }

                    break;
                }
                case "delete": {
                    if (event.success) {
                        Tooltip(
                            `Successfully deleted album "${event.album.title}"`
                        );
                    } else {
                        Tooltip(
                            `Could not delete album "${event.album.title}". Error: ${event.error}`
                        );
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        },
        onBookmarkEvent: (event) => {
            const post = getPost(event.postId, mockPosts);

            if (!post) {
                Tooltip(
                    `Error: Could not find post with id "${event.postId}" amongst posts.`
                );

                return;
            }

            switch (event.type) {
                case "bookmark": {
                    if (event.success) {
                        Tooltip(
                            `Successfully added the post "${post.title}" to album "${event.album.title}"`
                        );
                    } else {
                        Tooltip(
                            `Error: Could not add the post "${post.title}" to album "${event.album.title}"`
                        );
                    }

                    break;
                }
                default: {
                    break;
                }
            }
        },
    },
};

export const Controlled: StoryObj<typeof meta> = {
    args: {
        albums: controlledAlbums,
    },
    render: (args) => {
        const [, setArgs] = useArgs();
        const setAlbums: Dispatch<SetStateAction<MockAlbum[] | undefined>> = (
            albums: SetStateAction<MockAlbum[] | undefined>
        ) => setArgs({ albums });

        // eslint-disable-next-line unicorn/consistent-function-scoping
        const onCreateAlbum = (title: string): AlbumEvent<MockAlbum> => {
            const success = Math.random() >= 0.5;

            if (success) {
                const album: MockAlbum = {
                    id: crypto.randomUUID(),
                    title,
                    randomNumber: Math.random(),
                };

                return {
                    success: true,
                    type: "create",
                    album,
                };
            }

            return {
                success: false,
                type: "create",
                title,
                error: `Failed to create album "${title}"`,
            };
        };

        const onDeleteAlbum = (album: MockAlbum): AlbumEvent<MockAlbum> => {
            if (!args.albums) {
                return {
                    success: false,
                    type: "delete",
                    album,
                    error: `Failed to delete album "${album.title}" - albums were not defined.`,
                };
            }

            const success = Math.random() >= 0.5;

            if (success) {
                return {
                    success: true,
                    type: "delete",
                    album,
                };
            }

            return {
                success: false,
                type: "delete",
                album,
                error: `Failed to delete album "${album.title}"`,
            };
        };

        // eslint-disable-next-line unicorn/consistent-function-scoping
        const onAlbumEvent = (event: AlbumEvent<MockAlbum>): void => {
            switch (event.type) {
                case "create": {
                    if (event.success) {
                        Tooltip(
                            `Successfully created album "${event.album.title}" (including the post).  Mock obj random number: ${event.album.randomNumber}"`
                        );
                    } else {
                        Tooltip(`Error: ${event.error}.`);
                    }

                    break;
                }
                case "delete": {
                    if (event.success) {
                        Tooltip(
                            `Successfully deleted album "${event.album.title}". Mock obj random number: ${event.album.randomNumber}"`
                        );
                    } else {
                        Tooltip(
                            `Could not delete album "${event.album.title}". Error: ${event.error}. Mock obj random number: ${event.album.randomNumber}"`
                        );
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        };

        const onBookmarkPost = (
            postId: string,
            album: MockAlbum
            // eslint-disable-next-line unicorn/consistent-function-scoping
        ): BookmarkEvent<MockAlbum> => {
            const success = Math.random() >= 0.5;

            if (success) {
                return {
                    success: true,
                    type: "bookmark",
                    album,
                    postId,
                };
            }

            return {
                success: false,
                type: "bookmark",
                album,
                postId,
                error: "Bookmarking failed.",
            };
        };

        const onBookmarkEvent = (event: BookmarkEvent<MockAlbum>): void => {
            const post = getPost(event.postId, mockPosts);

            if (!post) {
                Tooltip(
                    `Error: Could not find post with id "${event.postId}" amongst posts.`
                );

                return;
            }

            switch (event.type) {
                case "bookmark": {
                    if (event.success) {
                        Tooltip(
                            `Successfully added the post "${post?.title}" to album "${event.album.title}". Mock obj random number: ${event.album.randomNumber}"`
                        );
                    } else {
                        Tooltip(
                            `Could not add the post "${post?.title}" to album "${event.album.title}". Error: ${event.error}.  Mock obj random number: ${event.album.randomNumber}"`
                        );
                    }

                    break;
                }
                default: {
                    break;
                }
            }
        };

        return (
            <AlbumSelection
                postId="1"
                albums={args.albums as MockAlbum[] | undefined}
                onAlbumsChange={setAlbums}
                onCreateAlbum={onCreateAlbum}
                onDeleteAlbum={onDeleteAlbum}
                onAlbumEvent={onAlbumEvent}
                onBookmarkPost={onBookmarkPost}
                onBookmarkEvent={onBookmarkEvent}
            />
        );
    },
};
