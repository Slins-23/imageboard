import Button from "@/components/Button/button";
import DialogCard from "./dialogCard";
import TextBox from "@/components/TextBox/textBox";
import { useId, useState } from "react";

export default function CreateAlbumDialog({
    onCreate,
}: {
    onCreate?: (albumTitle: string) => void;
}) {
    const [albumTitle, setAlbumTitle] = useState("");
    const textLabel = useId();

    return (
        <DialogCard cardProps={{ style: { width: "450px" } }}>
            <span>Type the new album name</span>
            <TextBox
                value={albumTitle}
                onTextChange={setAlbumTitle}
                style={{
                    width: "50%",
                    fontSize: "0.889em",
                }}
                aria-label={textLabel}
            />
            <Button
                aria-label={"Create"}
                onClick={() => onCreate?.(albumTitle)}
            >
                Create
            </Button>
        </DialogCard>
    );
}
