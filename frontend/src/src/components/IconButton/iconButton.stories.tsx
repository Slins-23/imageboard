import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "./iconButton";
import {
    faHouse,
    faTags,
    faGear,
    faPlus,
    faMessage,
    faBell,
    faUser,
    faCircleHalfStroke,
    faArrowLeft,
    faArrowRight,
    faRefresh,
    faSearch,
    faAngleDown,
    faEye,
    faX,
} from "@fortawesome/free-solid-svg-icons";
import type { MouseEvent } from "react";
import { useArgs } from "storybook/preview-api";

const meta: Meta<typeof IconButton> = {
    title: "Components/IconButton",
    component: IconButton,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const HomeButton: Story = {
    args: {
        "aria-label": "Home button",
        disabled: false,
        notificationProps: { count: 0 },
        btnIcon: faHouse,
        width: "50px",
        height: "50px",
        iconSize: "25px",
        iconWidthScale: 1,
        iconHeightScale: 1,
        hasNotifications: false,
    },
};

export const ControlledHomeButton: Story = {
    args: {
        "aria-label": "Home button",
        disabled: false,
        notificationProps: { count: 0 },
        btnIcon: faHouse,
        width: "50px",
        height: "50px",
        iconSize: "25px",
        iconWidthScale: 1,
        iconHeightScale: 1,
        hasNotifications: false,
        isActive: false,
    },
    render: (args) => {
        const [, setArgs] = useArgs();
        const setIsActive = (isActive: boolean) => setArgs({ isActive });

        const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();

            const buttonElement = event.currentTarget as HTMLButtonElement;

            alert(
                `Button is pressed? ${buttonElement.getAttribute("aria-pressed")}`
            );

            setArgs({ isActive: !args.isActive });
        };

        return (
            <IconButton
                {...args}
                onActiveChange={setIsActive}
                onClick={clickHandler}
            />
        );
    },
};

export const TagsButton: Story = {
    args: {
        "aria-label": "tagsBtn",
        disabled: false,
        btnIcon: faTags,
        iconSize: "28px",
    },
};

export const SettingsButton: Story = {
    args: {
        "aria-label": "settingsBtn",
        disabled: false,
        btnIcon: faGear,
    },
};

export const CreateButton: Story = {
    args: {
        "aria-label": "createBtn",
        disabled: false,
        btnIcon: faPlus,
        iconSize: "30px",
    },
};

export const ChatsButton: Story = {
    args: {
        "aria-label": "chatsBtn",
        disabled: false,
        btnIcon: faMessage,
        hasNotifications: true,
        notificationProps: { count: 32 },
    },
};

export const NotificationsButton: Story = {
    args: {
        "aria-label": "notificationsBtn",
        disabled: false,
        btnIcon: faBell,
        hasNotifications: true,
        notificationProps: { count: 55 },
        iconSize: "30px",
    },
};

export const UserButton: Story = {
    args: {
        "aria-label": "userBtn",
        disabled: false,
        btnIcon: faUser,
        iconWidthScale: 1.15,
        iconHeightScale: 1.15,
    },
};

export const ThemeButton: Story = {
    args: {
        "aria-label": "themeBtn",
        disabled: false,
        btnIcon: faCircleHalfStroke,
    },
};

export const LeftButton: Story = {
    args: {
        "aria-label": "leftBtn",
        disabled: false,
        btnIcon: faArrowLeft,
    },
};

export const RightButton: Story = {
    args: {
        "aria-label": "rightBtn",
        disabled: false,
        btnIcon: faArrowRight,
    },
};

export const RefreshButton: Story = {
    args: {
        "aria-label": "refreshBtn",
        disabled: false,
        btnIcon: faRefresh,
    },
};

export const SearchButton: Story = {
    args: {
        "aria-label": "searchBtn",
        disabled: false,
        btnIcon: faSearch,
    },
};

export const DownButton: Story = {
    args: {
        "aria-label": "downBtn",
        disabled: false,
        btnIcon: faAngleDown,
        iconSize: "30px",
        iconWidthScale: 1,
        iconHeightScale: 1.25,
    },
};

export const ViewButton: Story = {
    args: {
        "aria-label": "viewBtn",
        disabled: false,
        btnIcon: faEye,
    },
};

export const CloseButton: Story = {
    args: {
        "aria-label": "closeBtn",
        disabled: false,
        btnIcon: faX,
    },
};
