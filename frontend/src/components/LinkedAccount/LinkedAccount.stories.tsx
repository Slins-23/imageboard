import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LinkedAccount from "./LinkedAccount";
import { useArgs } from "storybook/internal/preview-api";

const meta: Meta<typeof LinkedAccount> = {
    title: "Components/LinkedAccount",
    component: LinkedAccount,
};

export default meta;

export const Google: StoryObj<typeof meta> = {
    args: {
        iconSrc: "google.svg",
        width: "85px",
        height: "85px",
    },
};

export const GoogleControlled: StoryObj<typeof meta> = {
    args: {
        isConnected: false,
    },
    render: (args) => {
        const [, setArgs] = useArgs();
        const setConnectedChange = (isConnected?: boolean) =>
            setArgs({ isConnected });

        return (
            <LinkedAccount
                {...args}
                onConnectedChange={setConnectedChange}
                onDisconnected={() => alert("Disconnected!")}
                onConnected={() => alert("Connected")}
            />
        );
    },
};

export const Facebook: StoryObj<typeof meta> = {
    args: {
        iconSrc: "facebook.svg",
        width: "85px",
        height: "85px",
    },
};
