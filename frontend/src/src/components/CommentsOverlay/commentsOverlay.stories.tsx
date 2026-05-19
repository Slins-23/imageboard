import type { Args, Meta, StoryObj } from "@storybook/nextjs-vite";
import CommentsOverlay from "./commentsOverlay";
import { UserPII } from "@/types/user";
import { PostBody } from "@/types/post";
import { Album } from "@/types/album";
import { useArgs } from "storybook/internal/preview-api";
import { randomRecentUploadTimestamp } from "@/utils/utils";
import { CommentObject } from "@/components/Comment/types";
import Tooltip from "@/components/Tooltip/tooltip";

const meta: Meta<typeof CommentsOverlay> = {
    title: "Components/CommentsOverlay",
    component: CommentsOverlay,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {
        comments: [
            {
                userData: {
                    id: "",
                    username: "whoever",
                    avatar: undefined,
                },
                comment: {
                    created_at: randomRecentUploadTimestamp(),
                    id: "commentA",
                    text: "I don't know what to say here, but this should be a regular comment",
                    post: "postID",
                    posted_by: "whoever",
                    reply_to: undefined,
                },
                metrics: {
                    id: "commentA",
                    likes: 240,
                    replies: 9,
                },
            },
            {
                userData: {
                    id: "1337",
                    username: "Slins",
                    avatar: "/images/thumb/userb.jpg",
                },
                comment: {
                    created_at: randomRecentUploadTimestamp(),
                    id: "commentB",
                    text: "This is my comment, so I can delete it",
                    post: "postID",
                    posted_by: "Slins",
                    reply_to: undefined,
                },
                metrics: {
                    id: "commentB",
                    likes: 240,
                    replies: 0,
                },
            },
            {
                userData: {
                    id: "",
                    username: "whoever",
                    avatar: undefined,
                },
                comment: {
                    created_at: randomRecentUploadTimestamp(),
                    id: "commentC",
                    text: "I don't know what to say here, but this should be a regular comment",
                    post: "postID",
                    posted_by: "whoever",
                    reply_to: undefined,
                },
                metrics: {
                    id: "commentC",
                    likes: 240,
                    replies: 26,
                },
            },
            {
                userData: {
                    id: "",
                    username: "whoever",
                    avatar: undefined,
                },
                comment: {
                    created_at: randomRecentUploadTimestamp(),
                    id: "commentD",
                    text: "I don't know what to say here, but this should be a regular comment",
                    post: "postID",
                    posted_by: "whoever",
                    reply_to: undefined,
                },
                metrics: {
                    id: "commentD",
                    likes: 240,
                    replies: 0,
                },
            },
            {
                userData: {
                    id: "",
                    username: "whoever",
                    avatar: undefined,
                },
                comment: {
                    created_at: randomRecentUploadTimestamp(),
                    id: "commentE",
                    text: "I don't know what to say here, but this should be a regular comment",
                    post: "postID",
                    posted_by: "whoever",
                    reply_to: undefined,
                },
                metrics: {
                    id: "commentE",
                    likes: 240,
                    replies: 0,
                },
            },
            {
                userData: {
                    id: "",
                    username: "whoever",
                    avatar: undefined,
                },
                comment: {
                    created_at: randomRecentUploadTimestamp(),
                    id: "commentF",
                    text: "I don't know what to say here, but this should be a regular comment",
                    post: "postID",
                    posted_by: "whoever",
                    reply_to: undefined,
                },
                metrics: {
                    id: "commentF",
                    likes: 240,
                    replies: 0,
                },
            },
            {
                userData: {
                    id: "",
                    username: "whoever",
                    avatar: undefined,
                },
                comment: {
                    created_at: randomRecentUploadTimestamp(),
                    id: "commentG",
                    text: "I don't know what to say here, but this should be a regular comment",
                    post: "postID",
                    posted_by: "whoever",
                    reply_to: undefined,
                },
                metrics: {
                    id: "commentG",
                    likes: 240,
                    replies: 0,
                },
            },
            {
                userData: {
                    id: "",
                    username: "whoever",
                    avatar: undefined,
                },
                comment: {
                    created_at: randomRecentUploadTimestamp(),
                    id: "commentH",
                    text: "I don't know what to say here, but this should be a regular comment",
                    post: "postID",
                    posted_by: "whoever",
                    reply_to: undefined,
                },
                metrics: {
                    id: "commentH",
                    likes: 240,
                    replies: 0,
                },
            },
            {
                userData: {
                    id: "",
                    username: "whoever",
                    avatar: undefined,
                },
                comment: {
                    created_at: randomRecentUploadTimestamp(),
                    id: "commentI",
                    text: "I don't know what to say here, but this should be a regular comment",
                    post: "postID",
                    posted_by: "whoever",
                    reply_to: undefined,
                },
                metrics: {
                    id: "commentI",
                    likes: 240,
                    replies: 0,
                },
            },
            {
                userData: {
                    id: "",
                    username: "whoever",
                    avatar: undefined,
                },
                comment: {
                    created_at: randomRecentUploadTimestamp(),
                    id: "commentJ",
                    text: "I don't know what to say here, but this should be a regular comment",
                    post: "postID",
                    posted_by: "whoever",
                    reply_to: undefined,
                },
                metrics: {
                    id: "commentJ",
                    likes: 240,
                    replies: 0,
                },
            },
        ],
    },
    render: (args: Args) => {
        const [, setArgs] = useArgs();
        const setComments = (comments: CommentObject[]) =>
            setArgs({ comments });
        const setIsDeleteDialogOpen = (isOpen: boolean) =>
            setArgs({ isDeleteDialogOpen: isOpen });

        /*
        function onAlbumCreated(
            user?: UserPII,
            post?: PostBody,
            album?: Album
        ) {
            const final_albums = [album];

            setAlbums([...(args.albums as Album[]), album as Album]);

            return true;
        }
        */

        function onCommentDeleted(deletedComment: CommentObject) {
            setComments(
                args.comments?.filter(
                    (comment: CommentObject) =>
                        comment.comment.id !== deletedComment.comment.id
                ) as CommentObject[]
            );

            setIsDeleteDialogOpen(false);

            return true;
        }

        function onCommented(comment: CommentObject) {
            setComments([comment, ...args.comments]);
        }

        return (
            <CommentsOverlay
                {...args}
                onCommentDeleted={onCommentDeleted}
                onCommented={onCommented}
                // onAlbumCreated={onAlbumCreated}
            />
        );
    },
};
