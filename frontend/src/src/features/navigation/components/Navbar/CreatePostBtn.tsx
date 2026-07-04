"use client";

import CreatePost from "@/ui/components/Posts/CreatePost/CreatePost";
import * as Modal from "@/ui/components/Overlays/Modal/modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";

export default function CreatePostBtn() {
    return (
        <Modal.Root>
            <Modal.Trigger
                triggerValue={true}
                asChild
            >
                <IconButton
                    icon={faPlus}
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
