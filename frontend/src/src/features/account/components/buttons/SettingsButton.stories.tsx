import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof IconButton> = {
    title: "Features/Account/Buttons/Settings",
    component: IconButton,
};

export default meta;

export const SettingsButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "settingsBtn",
        disabled: false,
        icon: faGear,
    },
};
