import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SignupDialog from "./SignupDialog";
import AccountDetails from "./AccountDetails";
import SignupConfirmation from "./SignupConfirmation";

const meta: Meta<typeof SignupDialog> = {
    title: "UI/Account/SignupDialog",
    component: SignupDialog,
};

export default meta;

export const StageOne: StoryObj<typeof meta> = {
    render: () => {
        return (
            <SignupDialog>
                <AccountDetails />
            </SignupDialog>
        );
    },
};

export const StageTwo: StoryObj<typeof meta> = {
    render: () => {
        return (
            <SignupDialog>
                <SignupConfirmation />
            </SignupDialog>
        );
    },
};
