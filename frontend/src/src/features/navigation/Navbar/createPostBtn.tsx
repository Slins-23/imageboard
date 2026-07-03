"use client";

import CreatePost from "@/ui/components/CreatePost/createPost";
import * as Modal from "@/ui/components/Modal/modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@/ui/components/IconButton/iconButton";

export default function CreatePostBtn() {
    return (
        <Modal.Root>
            <Modal.Trigger
                triggerValue={true}
                asChild
            >
                <IconButton
                    btnIcon={faPlus}
                    width="50px"
                    height="50px"
                    iconSize="25px"
                />
            </Modal.Trigger>
            <Modal.Content>
                <CreatePost />
            </Modal.Content>
        </Modal.Root>
    );
}
