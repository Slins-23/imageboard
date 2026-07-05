import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CreateAlbumDialog from "./CreateAlbumDialog";
import Toast from "@/ui/components/Overlays/Toast/toast";

const meta: Meta<typeof CreateAlbumDialog> = {
    title: "Features/Albums/Dialogs/CreateAlbumDialog",
    component: CreateAlbumDialog,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        onCreate: () => Toast("Create clicked!"),
    },
};
