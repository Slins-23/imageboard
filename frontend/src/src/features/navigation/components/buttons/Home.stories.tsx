import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import type { MouseEvent } from "react";
import { useArgs } from "storybook/internal/preview-api";

const meta: Meta<typeof IconButton> = {
    title: "Features/Navigation/Buttons/Home",
    component: IconButton,
};

export default meta;

export const HomeButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "Home button",
        disabled: false,
        notificationProps: { count: 0 },
        icon: faHouse,
        width: "50px",
        height: "50px",
        iconSize: "25px",
        iconWidthScale: 1,
        iconHeightScale: 1,
        hasNotifications: false,
    },
};

export const ControlledHomeButton: StoryObj<typeof meta> = {
    args: {
        "aria-label": "Home button",
        disabled: false,
        notificationProps: { count: 0 },
        icon: faHouse,
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
