import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CreatePost from "./createPost";
import * as Modal from "@/components/Modal/modal";

const meta: Meta<typeof CreatePost> = {
    title: "Components/CreatePost",
    component: CreatePost,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        defaultStage: "Upload",
    },
    /*
    render: () => {
        return (
            <Modal.Root>
                <Modal.Trigger triggerValue={true} />
                <Modal.Content>
                    <Modal.Trigger triggerValue={false} />
                </Modal.Content>
            </Modal.Root>
        );
    },
    */
};

export const Loading: Story = {
    args: {
        defaultStage: "Loading",
    },
};

export const Failure: Story = {
    args: {
        defaultStage: "Failure",
    },
};

export const Success: Story = {
    args: {
        defaultStage: "Success",
    },
};
