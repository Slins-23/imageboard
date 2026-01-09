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
    title: "Components/IconButton",
    component: iconButton,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const HomeButton: Story = {
    args: {
        ariaLabel: "Home button",
        btnIcon: faHouse,
        width: "50px",
        height: "50px",
        iconSize: "25px",
        iconWidthScale: 1,
        iconHeightScale: 1,
        hasNotifications: false,
        unreadNotifications: 0,
    },
};

export const TagsButton: Story = {
    args: {
        ariaLabel: "tagsBtn",
        btnIcon: faTags,
        iconSize: "28px",
    },
};

export const SettingsButton: Story = {
    args: {
        ariaLabel: "settingsBtn",
        btnIcon: faGear,
    },
};

export const CreateButton: Story = {
    args: {
        ariaLabel: "createBtn",
        btnIcon: faPlus,
        iconSize: "30px",
    },
};

export const ChatsButton: Story = {
    args: {
        ariaLabel: "chatsBtn",
        btnIcon: faMessage,
        hasNotifications: true,
        unreadNotifications: 32,
    },
};

export const NotificationsButton: Story = {
    args: {
        ariaLabel: "notificationsBtn",
        btnIcon: faBell,
        hasNotifications: true,
        unreadNotifications: 55,
        iconSize: "30px",
    },
};

export const UserButton: Story = {
    args: {
        ariaLabel: "userBtn",
        btnIcon: faUser,
        iconWidthScale: 1.15,
        iconHeightScale: 1.15,
    },
};

export const ThemeButton: Story = {
    args: {
        ariaLabel: "themeBtn",
        btnIcon: faCircleHalfStroke,
    },
};

export const LeftButton: Story = {
    args: {
        ariaLabel: "leftBtn",
        btnIcon: faArrowLeft,
    },
};

export const RightButton: Story = {
    args: {
        ariaLabel: "rightBtn",
        btnIcon: faArrowRight,
    },
};

export const RefreshButton: Story = {
    args: {
        ariaLabel: "refreshButton",
        btnIcon: faRefresh,
    },
};

export const SearchButton: Story = {
    args: {
        ariaLabel: "searchBtn",
        btnIcon: faSearch,
    },
};

export const DownButton: Story = {
    args: {
        ariaLabel: "downBtn",
        btnIcon: faAngleDown,
        iconSize: "30px",
        iconWidthScale: 1,
        iconHeightScale: 1.25,
    },
};

export const ViewButton: Story = {
    args: {
        ariaLabel: "viewBtn",
        btnIcon: faEye,
    },
};

export const CloseButton: Story = {
    args: {
        ariaLabel: "closeBtn",
        btnIcon: faX,
    },
};
