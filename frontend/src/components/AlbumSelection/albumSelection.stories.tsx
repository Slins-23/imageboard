import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AlbumSelection from "./albumSelection";
import { UserPII } from "@/types/user";
import { PostBody } from "@/types/post";
import { Album } from "@/types/album";
import { useArgs } from "storybook/internal/preview-api";
import Success from "../CreatePost/success";

const meta: Meta<typeof AlbumSelection> = {
    title: "Components/AlbumSelection",
    component: AlbumSelection,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        albums: [
            {
                title: "Cars",
                id: "albumIdA",
                cover: "images/thumb/albumcars.png",
                created_at: -1,
                last_update: -1,
                owner: "",
                total_images: -1,
            },
            {
                title: "Contrasting",
                id: "albumIdB",
                cover: "images/thumb/albumcontrasting.png",
                created_at: -1,
                last_update: -1,
                owner: "",
                total_images: -1,
            },
            {
                title: "Cozy images",
                id: "albumIdC",
                cover: "images/thumb/albumcozyimages.jpg",
                created_at: -1,
                last_update: -1,
                owner: "",
                total_images: -1,
            },
            {
                title: "Fantasy",
                id: "albumIdD",
                cover: "images/thumb/albumfantasy.jpg",
                created_at: -1,
                last_update: -1,
                owner: "",
                total_images: -1,
            },
            {
                title: "Nice wallpapers",
                id: "albumIdE",
                cover: "images/thumb/albumnicewallpapers.png",
                created_at: -1,
                last_update: -1,
                owner: "",
                total_images: -1,
            },
            {
                title: "Snowy places",
                id: "albumIdF",
                cover: "images/thumb/albumsnowyplaces.jpg",
                created_at: -1,
                last_update: -1,
                owner: "",
                total_images: -1,
            },
            {
                title: "Unique",
                id: "albumIdG",
                cover: "images/thumb/albumunique.jpg",
                created_at: -1,
                last_update: -1,
                owner: "",
                total_images: -1,
            },
        ],
    },
    render: (args) => {
        const [, setArgs] = useArgs();
        const setAlbums = (albums: Album[]) => setArgs({ albums });
        const setIsDeleteDialogOpen = (isOpen: boolean) =>
            setArgs({ isDeleteDialogOpen: isOpen });

        function onAlbumCreated(
            user?: UserPII,
            post?: PostBody,
            album?: Album
        ) {
            const final_albums = [album];

            setAlbums([...(args.albums as Album[]), album as Album]);

            return true;
        }

        function onAlbumDeleted(deletedAlbum: Album) {
            setAlbums(
                args.albums?.filter(
                    (album: Album) => album.id !== deletedAlbum.id
                ) as Album[]
            );

            setIsDeleteDialogOpen(false);

            return true;
        }

        return (
            <AlbumSelection
                {...args}
                onAlbumDeleted={onAlbumDeleted}
                onAlbumCreated={onAlbumCreated}
            />
        );
    },
};
