import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CreateAlbumSuccessDialog from "./CreateAlbumSuccessDialog";

const meta: Meta<typeof CreateAlbumSuccessDialog> = {
    title: "Features/Albums/Dialogs/CreateAlbumSuccessDialog",
    component: CreateAlbumSuccessDialog,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {},
};
