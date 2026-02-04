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
        buttonProps: { "aria-label": "Home button" },
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
        buttonProps: { "aria-label": "Home button" },
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
                buttonProps={{ onClick: clickHandler }}
            />
        );
    },
};

export const TagsButton: Story = {
    args: {
        buttonProps: { "aria-label": "tagsBtn" },
        btnIcon: faTags,
        iconSize: "28px",
    },
};

export const SettingsButton: Story = {
    args: {
        buttonProps: { "aria-label": "settingsBtn" },
        btnIcon: faGear,
    },
};

export const CreateButton: Story = {
    args: {
        buttonProps: { "aria-label": "createBtn" },
        btnIcon: faPlus,
        iconSize: "30px",
    },
};

export const ChatsButton: Story = {
    args: {
        buttonProps: { "aria-label": "chatsBtn" },
        btnIcon: faMessage,
        hasNotifications: true,
        notificationProps: { count: 32 },
    },
};

export const NotificationsButton: Story = {
    args: {
        buttonProps: { "aria-label": "notificationsBtn" },
        btnIcon: faBell,
        hasNotifications: true,
        notificationProps: { count: 55 },
        iconSize: "30px",
    },
};

export const UserButton: Story = {
    args: {
        buttonProps: { "aria-label": "userBtn" },
        btnIcon: faUser,
        iconWidthScale: 1.15,
        iconHeightScale: 1.15,
    },
};

export const ThemeButton: Story = {
    args: {
        buttonProps: { "aria-label": "themeBtn" },
        btnIcon: faCircleHalfStroke,
    },
};

export const LeftButton: Story = {
    args: {
        buttonProps: { "aria-label": "leftBtn" },
        btnIcon: faArrowLeft,
    },
};

export const RightButton: Story = {
    args: {
        buttonProps: { "aria-label": "rightBtn" },
        btnIcon: faArrowRight,
    },
};

export const RefreshButton: Story = {
    args: {
        buttonProps: { "aria-label": "refreshBtn" },
        btnIcon: faRefresh,
    },
};

export const SearchButton: Story = {
    args: {
        buttonProps: { "aria-label": "searchBtn" },
        btnIcon: faSearch,
    },
};

export const DownButton: Story = {
    args: {
        buttonProps: { "aria-label": "downBtn" },
        btnIcon: faAngleDown,
        iconSize: "30px",
        iconWidthScale: 1,
        iconHeightScale: 1.25,
    },
};

export const ViewButton: Story = {
    args: {
        buttonProps: { "aria-label": "viewBtn" },
        btnIcon: faEye,
    },
};

export const CloseButton: Story = {
    args: {
        buttonProps: { "aria-label": "closeBtn" },
        btnIcon: faX,
    },
};
