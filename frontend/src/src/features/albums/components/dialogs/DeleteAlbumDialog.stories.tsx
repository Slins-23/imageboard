import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DeleteAlbumDialog from "./DeleteAlbumDialog";

const meta: Meta<typeof DeleteAlbumDialog> = {
    title: "Features/Albums/DeleteAlbumDialog",
    component: DeleteAlbumDialog,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {},
};
