import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SignupDialog from "./signupDialog";
import AccountDetails from "./accountDetails";
import SignupConfirmation from "./signupConfirmation";

const meta: Meta<typeof SignupDialog> = {
    title: "Components/SignupDialog",
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
