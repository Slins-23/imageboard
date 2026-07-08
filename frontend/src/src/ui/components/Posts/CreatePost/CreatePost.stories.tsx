import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CreatePost from "./CreatePost";
import * as Modal from "@/ui/components/Overlays/Modal/modal";
import { useArgs } from "storybook/internal/preview-api";
import { Stage } from "@/ui/types/stages";
import Button from "@/ui/components/Buttons/Button/Button";
import { useRef, SetStateAction } from "react";
import UploadComponent from "./Upload";
import LoadingComponent from "./Loading";
import SuccessComponent from "./Success";
import FailureComponent from "./Failure";

const meta: Meta<typeof CreatePost> = {
    title: "UI/Posts/CreatePost",
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
        const setStage = (next: SetStateAction<Stage>) => {
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
                        onStageChange={setStage}
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
