import albumSelectionStyle from "./AlbumSelection.module.css";
import DialogCard from "@/ui/components/Layout/DialogCard/DialogCard";
import TextBox from "@/ui/components/Input/TextBox/TextBox";
import Button from "@/ui/components/Buttons/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
    useRef,
    useState,
    type MouseEvent,
    type KeyboardEvent,
    type Dispatch,
    type SetStateAction,
    useMemo,
} from "react";
import Image from "next/image";
import useControllableState from "@/ui/hooks/useControllableState";
import DeleteAlbumDialog from "@/features/albums/components/dialogs/DeleteAlbumDialog";
import * as Modal from "@/ui/components/Overlays/Modal/modal";
import CreateAlbumDialog from "@/features/albums/components/dialogs/CreateAlbumDialog";

export interface AlbumLike {
    id: string;
    title: string;
    cover?: string;
}

export type AlbumEvent<TAlbum extends AlbumLike> =
    | {
          type: "create";
          success: false;
          title: string;
          error: string;
      }
    | {
          type: "create";
          success: true;
          album: TAlbum;
      }
    | {
          type: "delete";
          success: true;
          album: TAlbum;
      }
    | {
          type: "delete";
          success: false;
          album: TAlbum;
          error: string;
      };

export type BookmarkEvent<TAlbum extends AlbumLike> =
    | {
          type: "bookmark";
          success: true;
          postId: string;
          album: TAlbum;
      }
    | {
          type: "bookmark";
          success: false;
          postId: string;
          album: TAlbum;
          error: string;
      };

interface AlbumSelectionArgs<TAlbum extends AlbumLike> {
    postId: string;
    defaultAlbums?: TAlbum[];
    albums?: TAlbum[];
    onAlbumsChange?: Dispatch<SetStateAction<TAlbum[] | undefined>>;
    defaultSearchText?: string;
    searchText?: string;
    onTextChange?: Dispatch<SetStateAction<string | undefined>>;
    transformText?: (text: string) => string;
    onCreateAlbum?: (title: string) => AlbumEvent<TAlbum>;
    onDeleteAlbum?: (album: TAlbum) => AlbumEvent<TAlbum>;
    onAlbumEvent?: (event: AlbumEvent<TAlbum>) => void;
    onBookmarkPost?: (postId: string, album: TAlbum) => BookmarkEvent<TAlbum>;
    onBookmarkEvent?: (event: BookmarkEvent<TAlbum>) => void;
}

function defaultCreateAlbum(title: string): AlbumEvent<AlbumLike> {
    const album: AlbumLike = {
        id: crypto.randomUUID(),
        title,
    };

    return {
        type: "create",
        success: true,
        album,
    };
}

function defaultDeleteAlbum<TAlbum extends AlbumLike>(
    album: TAlbum
): AlbumEvent<AlbumLike> {
    return {
        type: "delete",
        album,
        success: true,
    };
}

function defaultBookmarkPost<TAlbum extends AlbumLike>(
    postId: string,
    album: TAlbum
): BookmarkEvent<TAlbum> {
    return {
        type: "bookmark",
        album,
        postId,
        success: true,
    };
}

export default function AlbumSelection<TAlbum extends AlbumLike>({
    postId,
    defaultAlbums = [],
    albums,
    onAlbumsChange,
    onCreateAlbum,
    onDeleteAlbum,
    onAlbumEvent,
    defaultSearchText = "",
    searchText,
    onTextChange,
    transformText,
    onBookmarkPost,
    onBookmarkEvent,
}: AlbumSelectionArgs<TAlbum>) {
    const coverWidth = 75;
    const coverHeight = 75;

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

    const visibleAlbums = useMemo(() => {
        return internalAlbums.filter((album: TAlbum) => {
            if (internalSearchText?.trim() === "") {
                return true;
            }

            return album.title.includes(
                (internalSearchText as string).trim().toLowerCase()
            );
        });
    }, [internalAlbums, internalSearchText]);

    const albumRefs = useRef<HTMLLIElement[]>([]);

    const [selectedDeleteAlbum, setSelectedDeleteAlbum] =
        useState<TAlbum | null>(null);

    const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false);

    const [isCreateAlbumDialogOpen, setIsCreateAlbumDialogOpen] =
        useState(false);

    const handleBookmark = async (
        event: MouseEvent<HTMLLIElement>,
        album: TAlbum
    ) => {
        event.preventDefault();
        event.stopPropagation();

        const result = onBookmarkPost
            ? await onBookmarkPost(postId, album)
            : defaultBookmarkPost(postId, album);

        onBookmarkEvent?.(result);
    };

    const handleListFocus = (
        event: KeyboardEvent<HTMLLIElement>,
        idx: number
    ) => {
        if (!(event.target instanceof HTMLLIElement)) return;

        switch (event.key) {
            case " ":
            case "Enter": {
                event.preventDefault();
                albumRefs.current[idx].click();

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
                    idx < visibleAlbums.length - 1
                        ? albumRefs.current[idx + 1]
                        : albumRefs.current[idx];
                elementBelow?.focus();
                break;
            }
            default: {
                break;
            }
        }
    };

    const handleTrashClick = (
        event: MouseEvent<HTMLButtonElement>,
        album: TAlbum
    ) => {
        event.stopPropagation();

        setSelectedDeleteAlbum(album);

        if (!deleteIsOpen) {
            setDeleteIsOpen(true);
        }
    };

    const handleAlbumCreation = async (title: string) => {
        const result = onCreateAlbum
            ? await onCreateAlbum(title)
            : defaultCreateAlbum(title);

        if (result?.success) {
            setInternalAlbums([result.album as TAlbum, ...internalAlbums]);
        }

        setIsCreateAlbumDialogOpen(false);

        onAlbumEvent?.(result as AlbumEvent<TAlbum>);
    };

    const handleAlbumDeletion = async () => {
        if (!selectedDeleteAlbum) return;

        const result = onDeleteAlbum
            ? await onDeleteAlbum(selectedDeleteAlbum)
            : defaultDeleteAlbum(selectedDeleteAlbum);

        if (result.success) {
            setInternalAlbums(
                internalAlbums.filter(
                    (album: TAlbum) => selectedDeleteAlbum?.id !== album.id
                )
            );
        }

        if (deleteIsOpen) setDeleteIsOpen(false);

        onAlbumEvent?.(result as AlbumEvent<TAlbum>);
    };

    return (
        <DialogCard
            cardProps={{ style: { padding: "0" } }}
            wrapperArgs={{ className: albumSelectionStyle.dialogWrapper }}
        >
            <TextBox
                placeholder="Search albums"
                className={albumSelectionStyle.searchBox}
                value={internalSearchText}
                onTextChange={setInternalSearchText}
                transformText={transformText}
            ></TextBox>
            <ul className={albumSelectionStyle.albumList}>
                {visibleAlbums.map((album: TAlbum, idx: number) => (
                    <li
                        ref={(element) => {
                            if (element) albumRefs.current[idx] = element;
                            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                            else delete albumRefs.current[idx];
                        }}
                        className={albumSelectionStyle.album}
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                        role="button"
                        aria-label={`Delete album ${album.title}`}
                        key={album.id}
                        tabIndex={0}
                        onClick={(event) => handleBookmark(event, album)}
                        onKeyDown={(event) => handleListFocus(event, idx)}
                    >
                        <div
                            className={albumSelectionStyle.albumCover}
                            style={{
                                width: coverWidth,
                                height: coverHeight,
                            }}
                        >
                            {album.cover ? (
                                <Image
                                    src={album.cover}
                                    alt={`Album ${album.title} cover image`}
                                    width={coverWidth}
                                    height={coverHeight}
                                />
                            ) : (
                                <span
                                    style={{
                                        fontSize: "var(--font-size-4xl)",
                                    }}
                                >
                                    ?
                                </span>
                            )}
                        </div>

                        <span className={albumSelectionStyle.albumTitle}>
                            {album.title}
                        </span>
                        <button
                            aria-label="Delete"
                            aria-hidden="false"
                            className={albumSelectionStyle.albumTrash}
                            onClick={(event) => handleTrashClick(event, album)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                ))}
            </ul>
            <Button
                className={albumSelectionStyle.createAlbumBtn}
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
                isOpen={deleteIsOpen}
                onOpenChange={setDeleteIsOpen}
                defaultIsDismissible={true}
            >
                <Modal.Content>
                    <DeleteAlbumDialog
                        title={selectedDeleteAlbum?.title ?? "Unknown"}
                        onYes={handleAlbumDeletion}
                        onNo={() => setDeleteIsOpen(false)}
                    ></DeleteAlbumDialog>
                </Modal.Content>
            </Modal.Root>
            <Modal.Root
                isOpen={isCreateAlbumDialogOpen}
                onOpenChange={setIsCreateAlbumDialogOpen}
                defaultIsDismissible={true}
            >
                <Modal.Content>
                    <CreateAlbumDialog onCreate={handleAlbumCreation} />
                </Modal.Content>
            </Modal.Root>
        </DialogCard>
    );
}
