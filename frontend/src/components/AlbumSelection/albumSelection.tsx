import albumSelectionStyle from "./albumSelection.module.css";
import DialogCard from "@/components/DialogCard/dialogCard";
import TextBox from "@/components/TextBox/textBox";
import Button from "@/components/Button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useControllableState } from "@/utils/utils";
import DeleteAlbumDialog from "@/components/DialogCard/deleteAlbum";
import * as Modal from "@/components/Modal/modal";
import Tooltip from "@/components/Tooltip/tooltip";
import type { Album } from "@/types/album";
import CreateAlbumDialog from "@/components/DialogCard/createAlbum";
import type { PostBody } from "@/types/post";
import { UserPII } from "@/types/user";
import type { KeyboardEvent } from "react";

interface AlbumSelectionArgs {
    post?: PostBody;
    defaultAlbums?: Album[];
    albums?: Album[];
    onAlbumsChange?: (albums: Album[]) => void;
    defaultSearchText?: string;
    searchText?: string;
    onTextChange?: (text: string) => void;
    transformText?: (text: string) => string;
    onPostAdded?: (album: Album) => boolean; // true on success, false on failure
    onAlbumDeleted?: (deletedAlbum: Album) => boolean; // true on success, false on failure
    onAlbumCreated?: (
        user?: UserPII,
        post?: PostBody,
        album?: Album
    ) => boolean; // true on success, false on failure
    children?: ReactNode;
}

export default function AlbumSelection({
    defaultAlbums = [
        {
            title: "Cars",
            id: "albumIdA",
            cover: "/images/thumb/albumcars.png",
            created_at: -1,
            last_update: -1,
            owner: "",
            total_images: -1,
        },
        {
            title: "Contrasting",
            id: "albumIdB",
            cover: "/images/thumb/albumcontrasting.png",
            created_at: -1,
            last_update: -1,
            owner: "",
            total_images: -1,
        },
        {
            title: "Cozy images",
            id: "albumIdC",
            cover: "/images/thumb/albumcozyimages.jpg",
            created_at: -1,
            last_update: -1,
            owner: "",
            total_images: -1,
        },
        {
            title: "Fantasy",
            id: "albumIdD",
            cover: "/images/thumb/albumfantasy.jpg",
            created_at: -1,
            last_update: -1,
            owner: "",
            total_images: -1,
        },
        {
            title: "Nice wallpapers",
            id: "albumIdE",
            cover: "/images/thumb/albumnicewallpapers.png",
            created_at: -1,
            last_update: -1,
            owner: "",
            total_images: -1,
        },
        {
            title: "Snowy places",
            id: "albumIdF",
            cover: "/images/thumb/albumsnowyplaces.jpg",
            created_at: -1,
            last_update: -1,
            owner: "",
            total_images: -1,
        },
        {
            title: "Unique",
            id: "albumIdG",
            cover: "/images/thumb/albumunique.jpg",
            created_at: -1,
            last_update: -1,
            owner: "",
            total_images: -1,
        },
    ],
    albums = undefined,
    onAlbumsChange = undefined,
    defaultSearchText = "",
    searchText = undefined,
    onTextChange = undefined,
    transformText = undefined,
    onPostAdded = undefined,
    onAlbumDeleted = undefined,
    onAlbumCreated = undefined,
    children = undefined,
}: AlbumSelectionArgs) {
    const [internalAlbums, setInternalAlbums] = useControllableState({
        defaultValue: defaultAlbums,
        value: albums,
        onChange: onAlbumsChange,
    });
    const [internalSearchText, setInternalSearchText] = useControllableState({
        defaultValue: defaultSearchText,
        value: searchText,
        onChange: onTextChange,
    });

    const albumRefs = useRef<(HTMLLIElement | null)[]>([]);

    const [selectedDeleteAlbum, setSelectedDeleteAlbum] =
        useState<Album | null>(null);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const [isCreateAlbumDialogOpen, setIsCreateAlbumDialogOpen] =
        useState(false);

    const setAlbumRef = useCallback(
        (element: HTMLLIElement | null, index: number) => {
            if (!albumRefs.current) return;

            if (element && !albumRefs.current.includes(element)) {
                albumRefs.current[index] = element;
            }
        },
        []
    );

    return (
        <DialogCard
            cardProps={{ style: { padding: "0" } }}
            wrapperArgs={{
                style: {
                    padding: "1.375rem 1.875rem",
                    gap: "1.5625rem",
                    width: "430px",
                    height: "585px",
                },
            }}
        >
            <TextBox
                placeholder="Search albums"
                style={{
                    borderRadius: "10px",
                    padding: "1.15rem 1rem",
                    flexShrink: "0",
                    width: "100%",
                }}
                value={internalSearchText}
                onTextChange={setInternalSearchText}
                transformText={transformText}
            ></TextBox>
            <ul className={albumSelectionStyle.albumList}>
                {internalAlbums
                    ?.filter((album: Album) => {
                        if (internalSearchText?.trim() === "") {
                            return true;
                        } else {
                            return album.title.includes(
                                (internalSearchText as string).trim()
                            );
                        }
                    })
                    .map((album: Album, idx: number) => (
                        <li
                            tabIndex={0}
                            key={album.id}
                            ref={(element) => setAlbumRef(element, idx)}
                            className={albumSelectionStyle.album}
                            onClick={(event) => {
                                event.preventDefault();

                                // const success = onPostAdd?.(album);
                                const success = Math.round(Math.random());

                                if (success) {
                                    // Placeholder for server-side function to add post to album
                                    onPostAdded?.(album);
                                    Tooltip(
                                        `Successfully added the post to album "${album.title}"`
                                    );
                                } else {
                                    Tooltip(
                                        `Error: Could not add the post to album "${album.title}"`
                                    );
                                }
                            }}
                            onKeyDown={(event) => {
                                switch (event.code) {
                                    case "Enter":
                                    case "Space": {
                                        event.preventDefault();
                                        albumRefs.current[idx]?.click();
                                        break;
                                    }
                                    case "ArrowUp": {
                                        event.preventDefault();
                                        const elementAbove =
                                            idx > 0
                                                ? albumRefs.current[idx - 1]
                                                : albumRefs.current[idx];
                                        elementAbove?.focus();
                                        break;
                                    }
                                    case "ArrowDown": {
                                        event.preventDefault();
                                        const elementBelow =
                                            idx <
                                            (albums !== undefined
                                                ? albums.length - 1
                                                : defaultAlbums.length - 1)
                                                ? albumRefs.current[idx + 1]
                                                : albumRefs.current[idx];
                                        elementBelow?.focus();
                                        break;
                                    }
                                    default: {
                                        break;
                                    }
                                }
                            }}
                        >
                            <Image
                                className={albumSelectionStyle.albumCover}
                                src={album.cover}
                                alt={`Album ${album.title} cover image`}
                                width={75}
                                height={75}
                            />
                            <span className={albumSelectionStyle.albumTitle}>
                                {album.title}
                            </span>
                            <FontAwesomeIcon
                                className={albumSelectionStyle.albumTrash}
                                icon={faTrash}
                                tabIndex={0}
                                aria-label="Delete"
                                aria-hidden="false"
                                onClick={(event) => {
                                    event.stopPropagation();

                                    setSelectedDeleteAlbum(album);

                                    if (!isDeleteDialogOpen)
                                        setIsDeleteDialogOpen(true);
                                }}
                                onKeyDown={(
                                    event: KeyboardEvent<SVGSVGElement>
                                ) => {
                                    switch (event.code) {
                                        case "Space":
                                        case "Enter": {
                                            event.preventDefault();
                                            event.stopPropagation();

                                            setSelectedDeleteAlbum(album);

                                            if (!isDeleteDialogOpen)
                                                setIsDeleteDialogOpen(true);

                                            break;
                                        }
                                        default: {
                                            break;
                                        }
                                    }
                                }}
                            />{" "}
                        </li>
                    ))}
            </ul>
            <Button
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--font-size-lg)",
                    padding: "0.625rem 0.7rem",
                    flexShrink: "0",
                }}
                onClick={() => {
                    if (!isCreateAlbumDialogOpen)
                        setIsCreateAlbumDialogOpen(true);
                }}
            >
                <span>Create new album </span>
                <FontAwesomeIcon
                    icon={faPlus}
                    style={{ fontSize: "var(--font-size-lg)" }}
                />
            </Button>
            <Modal.Root
                isOpen={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                defaultIsDismissible={true}
            >
                <Modal.Content>
                    <DeleteAlbumDialog
                        title={selectedDeleteAlbum?.title ?? "Unknown"}
                        onYes={() => {
                            if (selectedDeleteAlbum === null) return;

                            // Placeholder for server-side function to delete the album
                            // const success = onAlbumDelete(selectedDeleteAlbum);
                            const success = Math.round(Math.random());

                            if (success) {
                                onAlbumDeleted?.(selectedDeleteAlbum);
                                setIsDeleteDialogOpen(false);
                                Tooltip(
                                    `Successfully deleted album ${selectedDeleteAlbum.title}"`
                                );
                            } else {
                                Tooltip(
                                    `Error: Could not delete album "${selectedDeleteAlbum.title}"`
                                );
                            }
                        }}
                        onNo={() => setIsDeleteDialogOpen(false)}
                    ></DeleteAlbumDialog>
                </Modal.Content>
            </Modal.Root>
            <Modal.Root
                isOpen={isCreateAlbumDialogOpen}
                onOpenChange={setIsCreateAlbumDialogOpen}
                defaultIsDismissible={true}
            >
                <Modal.Content>
                    <CreateAlbumDialog
                        onCreate={(albumTitle: string) => {
                            // Placeholder for server-side function to create the album and add post
                            //const success = onAlbumCreate?.(album)
                            const success = Math.round(Math.random());

                            if (success) {
                                const user: UserPII = {
                                    created_at: -1,
                                    email: "",
                                    id: "",
                                    language: "",
                                    last_login: -1,
                                    username: "",
                                    avatar: "",
                                    birthdate: "",
                                    country: "",
                                    gender: "",
                                };

                                // Placeholder data
                                const post: PostBody = {
                                    id: "",
                                    blurhash_full: "",
                                    created_at: -1,
                                    image: "/images/thumb/albumnew.jpg",
                                    original_height: -1,
                                    original_width: -1,
                                    owner: "",
                                    blurhash_feed: "",
                                    feed_height: -1,
                                    feed_width: -1,
                                };

                                const album: Album = {
                                    cover: post.image,
                                    created_at: -1,
                                    id: "",
                                    last_update: -1,
                                    owner: "",
                                    title: albumTitle,
                                    total_images: -1,
                                };

                                onAlbumCreated?.(user, post, album);

                                setIsCreateAlbumDialogOpen(false);
                                Tooltip(
                                    `Successfully created album "${albumTitle}" (including the post)`
                                );
                            } else {
                                Tooltip(
                                    `Error: Could not create album "${albumTitle}"`
                                );
                            }
                        }}
                    ></CreateAlbumDialog>
                </Modal.Content>
            </Modal.Root>
        </DialogCard>
    );
}
