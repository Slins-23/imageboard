import Button from "@/components/Button/button";
import DialogCard from "./dialogCard";
import type { KeyboardEvent } from "react";

interface DeleteAlbumDialogArgs {
    title?: string;
    onYes?: (...params: any[]) => void;
    onNo?: (...params: any[]) => void;
}

export default function DeleteAlbumDialog({
    title,
    onYes,
    onNo,
}: DeleteAlbumDialogArgs) {
    return (
        <DialogCard cardProps={{ style: { width: "450px" } }}>
            <span>
                Are you sure you want to delete the album{" "}
                <span style={{ color: "var(--tertiary)" }}>{title}</span>?
            </span>
            <div style={{ display: "flex", gap: "1.25rem" }}>
                <Button
                    aria-label="Yes"
                    onClick={onYes}
                    onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) => {
                        switch (event.code) {
                            case "Enter":
                            case "Space": {
                                event.preventDefault();
                                event.stopPropagation();

                                (event.target as HTMLButtonElement).click();
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    }}
                >
                    Yes
                </Button>
                <Button
                    aria-label="No"
                    onClick={onNo}
                >
                    No
                </Button>
            </div>
        </DialogCard>
    );
}
