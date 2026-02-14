import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";
import Button from "@/components/Button/button";
import Card from "@/components/Card/card";
import * as Modal from "./modal";
import { SetStateAction } from "@/utils/utils";
import { ComponentProps } from "react";

type ModalArgs = ComponentProps<typeof Modal.Root> &
    ComponentProps<typeof Modal.Content>;

const meta: Meta<ModalArgs> = {
    title: "Components/Modal",
    component: Modal.Root,
};

export default meta;

export const Uncontrolled: StoryObj<typeof meta> = {
    args: {
        isOpen: undefined,
        defaultIsOpen: false,
        onOpen: () => alert("Dialog opened!"),
        onClose: () => alert("Dialog closed!"),
        isDismissible: undefined,
        defaultIsDismissible: true,
        backgroundColor: "var(--secondary)",
        backgroundBlurOpacity: "var(--background-blur-opacity)",
        backgroundBlurRadius: "var(--background-blur-radius)",
    },
    render: (args) => {
        const {
            isOpen,
            defaultIsOpen,
            isDismissible,
            defaultIsDismissible,
            onDismissibleChange,
            onClose,
            onOpen,
            onOpenChange,
            backgroundBlurOpacity,
            backgroundBlurRadius,
            backgroundColor,
        } = args;

        const rootProps = {
            isOpen,
            defaultIsOpen,
            isDismissible,
            defaultIsDismissible,
            onDismissibleChange,
            onOpen,
            onClose,
            onOpenChange,
        };
        const contentProps = {
            backgroundColor,
            backgroundBlurOpacity,
            backgroundBlurRadius,
        };

        return (
            <Modal.Root
                {...rootProps}
                onOpen={onOpen}
                onClose={onClose}
            >
                <Modal.Trigger
                    value={true}
                    buttonProps={{
                        onClick: () => {
                            alert("Open clicked");
                        },
                    }}
                />

                <Modal.Content {...contentProps}>
                    <Card>Hello</Card>
                    <Modal.Trigger
                        value={false}
                        buttonProps={{
                            onClick: () => {
                                alert("Close clicked");
                            },
                        }}
                    />
                </Modal.Content>
            </Modal.Root>
        );
    },
};

export const Controlled: StoryObj<typeof meta> = {
    args: {
        isOpen: false,
        defaultIsOpen: false,
        onOpen: () => alert("Dialog opened!"),
        onClose: () => alert("Dialog closed!"),
        isDismissible: true,
        defaultIsDismissible: true,
        backgroundColor: "var(--secondary)",
        backgroundBlurOpacity: "var(--background-blur-opacity)",
        backgroundBlurRadius: "var(--background-blur-radius)",
    },
    render: (args) => {
        const [, setArgs] = useArgs();
        const setIsOpen = (isOpen: SetStateAction<boolean>) =>
            setArgs({ isOpen });
        const setIsDismissible = (isDismissible: SetStateAction<boolean>) =>
            setArgs({ isDismissible });

        const {
            isOpen,
            defaultIsOpen,
            isDismissible,
            defaultIsDismissible,
            onDismissibleChange,
            onClose,
            onOpen,
            onOpenChange,
            backgroundBlurOpacity,
            backgroundBlurRadius,
            backgroundColor,
        } = args;

        const rootProps = {
            isOpen,
            defaultIsOpen,
            isDismissible,
            defaultIsDismissible,
            onDismissibleChange,
            onOpen,
            onClose,
            onOpenChange,
        };
        const contentProps = {
            backgroundColor,
            backgroundBlurOpacity,
            backgroundBlurRadius,
        };

        return (
            <Modal.Root
                {...rootProps}
                onOpenChange={setIsOpen}
                onOpen={onOpen}
                onClose={onClose}
                onDismissibleChange={setIsDismissible}
            >
                <Modal.Trigger
                    value={true}
                    asChild
                >
                    <Button
                        aria-label="Open modal"
                        onClick={() => {
                            alert("Open clicked");
                        }}
                    />
                </Modal.Trigger>

                <Modal.Content {...contentProps}>
                    <Card>Hello</Card>
                    <Modal.Trigger
                        value={false}
                        asChild
                    >
                        <Button
                            aria-label="Close modal"
                            onClick={() => {
                                alert("Close clicked");
                            }}
                        />
                    </Modal.Trigger>
                </Modal.Content>
            </Modal.Root>
        );
    },
};
