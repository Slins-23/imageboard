import Button from "@/components/Button/button";
import DialogCard from "./dialogCard";

export default function DeletePostDialog({
    onYes,
    onNo,
}: {
    onYes?: (...params: any[]) => void;
    onNo?: (...params: any[]) => void;
}) {
    return (
        <DialogCard cardProps={{ style: { width: "450px" } }}>
            <span>Are you sure you want to delete this post?</span>
            <div style={{ display: "flex", gap: "1.25rem" }}>
                <Button
                    aria-label="Yes"
                    onClick={onYes}
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
