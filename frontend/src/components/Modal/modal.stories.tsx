import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useArgs } from "storybook/preview-api";
import Button from "@/components/Button/button";
import Card from "@/components/InterestCard/interestCard";
import * as Modal from "./modal";
import { ComponentProps, useRef } from "react";

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
                    triggerValue={true}
                    onClick={() => {
                        alert("Open clicked");
                    }}
                />

                <Modal.Content {...contentProps}>
                    <Card>Hello</Card>
                    <Modal.Trigger
                        triggerValue={false}
                        onClick={() => {
                            alert("Close clicked");
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
        isDismissible: useRef(true),
        defaultIsDismissible: true,
        backgroundColor: "var(--secondary)",
        backgroundBlurOpacity: "var(--background-blur-opacity)",
        backgroundBlurRadius: "var(--background-blur-radius)",
    },
    render: (args) => {
        const [, setArgs] = useArgs();
        const setIsOpen = (isOpen: boolean) => setArgs({ isOpen });
        const setIsDismissible = (isDismissible: boolean) =>
            setArgs({ isDismissible });

        const {
            isOpen,
            defaultIsOpen,
            isDismissible,
            defaultIsDismissible,

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
            >
                <Modal.Trigger
                    triggerValue={true}
                    asChild
                >
                    <Button
                        aria-label="Open modal"
                        onClick={() => {
                            alert("Open clicked");
                        }}
                    >
                        Open modal
                    </Button>
                </Modal.Trigger>

                <Modal.Content {...contentProps}>
                    <Card>Hello</Card>
                    <Modal.Trigger
                        triggerValue={false}
                        asChild
                    >
                        <Button
                            aria-label="Close modal"
                            onClick={() => {
                                alert("Close clicked");
                            }}
                        >
                            Close modal
                        </Button>
                    </Modal.Trigger>
                </Modal.Content>
            </Modal.Root>
        );
    },
};
