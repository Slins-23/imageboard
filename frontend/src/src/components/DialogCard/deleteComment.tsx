import Button from "@/components/Button/button";
import DialogCard from "./dialogCard";
import type { KeyboardEvent } from "react";

interface DeleteCommentDialogArgs {
    title?: string;
    onYes?: (...params: any[]) => void;
    onNo?: (...params: any[]) => void;
}

export default function DeleteCommentDialog({
    title,
    onYes,
    onNo,
}: DeleteCommentDialogArgs) {
    return (
        <DialogCard cardProps={{ style: { width: "450px" } }}>
            <span>Are you sure you want to delete this comment?</span>
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
