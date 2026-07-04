import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Comment from "./Comment";
import Toast from "@/ui/components/Overlays/Toast/toast";
import type { CommentObject } from "./types";

const meta: Meta<typeof Comment> = {
    title: "UI/Comments/Comment",
    component: Comment,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        onLike: (comment: CommentObject) => {
            const success = Math.round(Math.random());

            if (success) {
                Toast("Server-side like persisted");
                return true;
            } else {
                Toast("Failed to persist server-side like");
                return false;
            }
        },
        onUnlike: (comment: CommentObject) => {
            const success = Math.round(Math.random());

            if (success) {
                Toast("Server-side unlike persisted");
                return true;
            } else {
                Toast("Failed to persist server-side unlike");
                return false;
            }
        },
        onLiked: () => Toast("Successfully liked comment server-side"),
        onUnliked: () =>
            Toast("Successfully removed like from comment server-side"),
    },
};
