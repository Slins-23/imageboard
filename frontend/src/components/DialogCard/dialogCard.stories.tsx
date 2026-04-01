import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DeleteAlbumDialog from "./deleteAlbum";
import CreateAlbumDialog from "./createAlbum";
import CreateAlbumSuccessDialog from "./createAlbumSuccess";
import CreateAlbumErrorDialog from "./createAlbumError";
import DeletePostDialog from "./deletePost";
import DeleteAccountDialog from "./deleteAccount";
import SignupConfirmationDialog from "./signupConfirmation";
import DeleteCommentDialog from "./deleteComment";

const meta: Meta = {
    title: "Components/DialogCard",
};

export default meta;

export const DeleteAlbum: StoryObj<typeof DeleteAlbumDialog> = {
    render: DeleteAlbumDialog,
};

export const CreateAlbum: StoryObj<typeof CreateAlbumDialog> = {
    render: CreateAlbumDialog,
};

export const CreateAlbumSuccess: StoryObj<typeof CreateAlbumSuccessDialog> = {
    render: CreateAlbumSuccessDialog,
};

export const CreateAlbumError: StoryObj<typeof CreateAlbumErrorDialog> = {
    render: CreateAlbumErrorDialog,
};

export const DeletePost: StoryObj<typeof DeletePostDialog> = {
    render: DeletePostDialog,
};

export const DeleteComment: StoryObj<typeof DeleteCommentDialog> = {
    render: DeleteCommentDialog,
};

export const DeleteAccount: StoryObj<typeof DeleteAccountDialog> = {
    render: DeleteAccountDialog,
};

export const SignupConfirmation: StoryObj<typeof SignupConfirmationDialog> = {
    render: SignupConfirmationDialog,
};
