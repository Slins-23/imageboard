import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import iconButton from "./iconButton";
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

const meta: Meta<typeof iconButton> = {
    title: "Components/iconButton",
    component: iconButton,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const HomeButton: Story = {
    args: {
        btnId: "homeBtn",
        ariaLabel: "homeBtn",
        btnIcon: faHouse,
        isActive: false,
        width: 50,
        height: 50,
        iconSize: 25,
        iconWidthScale: 1,
        iconHeightScale: 1,
    },
};

export const TagsButton: Story = {
    args: {
        btnId: "tagsBtn",
        ariaLabel: "tagsBtn",
        btnIcon: faTags,
        iconSize: 28,
    },
};

export const SettingsButton: Story = {
    args: {
        btnId: "settingsBtn",
        ariaLabel: "settingsBtn",
        btnIcon: faGear,
    },
};

export const CreateButton: Story = {
    args: {
        btnId: "createBtn",
        ariaLabel: "createBtn",
        btnIcon: faPlus,
        iconSize: 30,
    },
};

export const ChatsButton: Story = {
    args: {
        btnId: "chatsBtn",
        ariaLabel: "chatsBtn",
        btnIcon: faMessage,
        hasNotifications: true,
        unreadNotifications: 32,
    },
};

export const NotificationsButton: Story = {
    args: {
        btnId: "notificationsBtn",
        ariaLabel: "notificationsBtn",
        btnIcon: faBell,
        hasNotifications: true,
        unreadNotifications: 55,
        iconSize: 30,
    },
};

export const UserButton: Story = {
    args: {
        btnId: "userBtn",
        ariaLabel: "userBtn",
        btnIcon: faUser,
        iconWidthScale: 1.15,
        iconHeightScale: 1.15,
    },
};

export const ThemeButton: Story = {
    args: {
        btnId: "themeBtn",
        ariaLabel: "themeBtn",
        btnIcon: faCircleHalfStroke,
    },
};

export const LeftButton: Story = {
    args: {
        btnId: "leftBtn",
        ariaLabel: "leftBtn",
        btnIcon: faArrowLeft,
    },
};

export const RightButton: Story = {
    args: {
        btnId: "rightBtn",
        ariaLabel: "rightBtn",
        btnIcon: faArrowRight,
    },
};

export const RefreshButton: Story = {
    args: {
        btnId: "refreshButton",
        ariaLabel: "refreshButton",
        btnIcon: faRefresh,
    },
};

export const SearchButton: Story = {
    args: {
        btnId: "searchBtn",
        ariaLabel: "searchBtn",
        btnIcon: faSearch,
    },
};

export const DownButton: Story = {
    args: {
        btnId: "downBtn",
        ariaLabel: "downBtn",
        btnIcon: faAngleDown,
        iconSize: 30,
        iconWidthScale: 1,
        iconHeightScale: 1.25,
    },
};

export const ViewButton: Story = {
    args: {
        btnId: "viewBtn",
        ariaLabel: "viewBtn",
        btnIcon: faEye,
    },
};

export const CloseButton: Story = {
    args: {
        btnId: "closeBtn",
        ariaLabel: "closeBtn",
        btnIcon: faX,
    },
};
