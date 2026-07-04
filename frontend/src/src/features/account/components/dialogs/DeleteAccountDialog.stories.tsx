import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DeleteAccountDialog from "./DeleteAccountDialog";
import Toast from "@/ui/components/Overlays/Toast/toast";

const meta: Meta<typeof DeleteAccountDialog> = {
    title: "Features/Account/DeleteAccountDialog",
    component: DeleteAccountDialog,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        onNo: () => Toast("No!"),
        onYes: () => Toast("Yes!"),
    },
};
