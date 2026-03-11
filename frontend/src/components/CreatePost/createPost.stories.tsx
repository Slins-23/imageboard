import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CreatePost from "./createPost";
import * as Modal from "@/components/Modal/modal";
import { useArgs } from "storybook/internal/preview-api";
import { Stage } from "./types";
import Button from "../Button/button";
import { useEffect, useRef } from "react";
import UploadComponent from "./upload";
import LoadingComponent from "./loading";
import SuccessComponent from "./success";
import FailureComponent from "./failure";

const meta: Meta<typeof CreatePost> = {
    title: "Components/CreatePost",
    component: CreatePost,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        currentStage: "Upload",
    },

    render: (args) => {
        const isDismissible = useRef(true);

        const [, setArgs] = useArgs();
        const setStage = (next: Stage) => {
            // isDismissible.current = false;
            setArgs({ currentStage: next });
        };

        return (
            // <Modal.Root isDismissible={isDismissible}>
            <Modal.Root isDismissible={isDismissible}>
                <Modal.Trigger
                    triggerValue={true}
                    asChild
                >
                    <Button>Create post</Button>
                </Modal.Trigger>
                <Modal.Content>
                    <CreatePost
                        currentStage={args.currentStage}
                        onStageChanged={setStage}
                    />
                    {/* <Modal.Trigger triggerValue={false} /> */}
                </Modal.Content>
            </Modal.Root>
        );
    },
};

export const Loading: Story = {
    args: {
        defaultStage: "Loading",
        currentStage: "Loading",
    },
    render: (args) => {
        return (
            <Modal.Root>
                <Modal.Trigger
                    triggerValue={true}
                    asChild
                >
                    <Button>Create post</Button>
                </Modal.Trigger>
                <Modal.Content>
                    <CreatePost {...args} />
                </Modal.Content>
            </Modal.Root>
        );
    },
};

export const Failure: Story = {
    args: {
        currentStage: "Failure",
        defaultStage: "Failure",
    },
    render: (args) => {
        return (
            <Modal.Root>
                <Modal.Trigger
                    triggerValue={true}
                    asChild
                >
                    <Button>Create post</Button>
                </Modal.Trigger>
                <Modal.Content>
                    <CreatePost {...args} />
                </Modal.Content>
            </Modal.Root>
        );
    },
};

export const Success: Story = {
    args: {
        currentStage: "Success",
        defaultStage: "Success",
    },
    render: (args) => {
        return (
            <Modal.Root>
                <Modal.Trigger
                    triggerValue={true}
                    asChild
                >
                    <Button>Create post</Button>
                </Modal.Trigger>
                <Modal.Content>
                    <CreatePost {...args} />
                </Modal.Content>
            </Modal.Root>
        );
    },
};
