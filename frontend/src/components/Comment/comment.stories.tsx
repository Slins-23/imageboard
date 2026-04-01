import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Comment from "./comment";
import Tooltip from "@/components/Tooltip/tooltip";
import type { CommentObject } from "./types";

const meta: Meta<typeof Comment> = {
    title: "Components/Comment",
    component: Comment,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        onLike: (comment: CommentObject) => {
            const success = Math.round(Math.random());

            if (success) {
                Tooltip("Server-side like persisted");
                return true;
            } else {
                Tooltip("Failed to persist server-side like");
                return false;
            }
        },
        onUnlike: (comment: CommentObject) => {
            const success = Math.round(Math.random());

            if (success) {
                Tooltip("Server-side unlike persisted");
                return true;
            } else {
                Tooltip("Failed to persist server-side unlike");
                return false;
            }
        },
        onLiked: () => Tooltip("Successfully liked comment server-side"),
        onUnliked: () =>
            Tooltip("Successfully removed like from comment server-side"),
    },
};
