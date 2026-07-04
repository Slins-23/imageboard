import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DeletePostDialog from "./DeletePostDialog";
import Toast from "@/ui/components/Overlays/Toast/toast";

const meta: Meta<typeof DeletePostDialog> = {
    title: "Features/Posts/DeletePostDialog",
    component: DeletePostDialog,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        onNo: () => Toast("No!"),
        onYes: () => Toast("Yes!"),
    },
};
