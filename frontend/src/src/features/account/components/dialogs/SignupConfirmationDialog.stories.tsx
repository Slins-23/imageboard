import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SignupConfirmationDialog from "./SignupConfirmationDialog";
import Toast from "@/ui/components/Overlays/Toast/toast";

const meta: Meta<typeof SignupConfirmationDialog> = {
    title: "Features/Account/Dialogs/SignupConfirmationDialog",
    component: SignupConfirmationDialog,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        onOk: () => Toast("OK!"),
    },
};
