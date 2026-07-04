import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CreateAlbumErrorDialog from "./CreateAlbumErrorDialog";

const meta: Meta<typeof CreateAlbumErrorDialog> = {
    title: "Features/Albums/CreateAlbumErrorDialog",
    component: CreateAlbumErrorDialog,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {},
};
