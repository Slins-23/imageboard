import Button from "@/ui/components/Buttons/Button/Button";
import DialogCard from "@/ui/components/Layout/DialogCard/DialogCard";
import type { KeyboardEvent } from "react";

interface DeleteAlbumDialogProps {
    title?: string;
    onYes?: () => void;
    onNo?: () => void;
}

export default function DeleteAlbumDialog({
    title,
    onYes,
    onNo,
}: DeleteAlbumDialogProps) {
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
                        switch (event.key) {
                            case "Enter":
                            case " ": {
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
