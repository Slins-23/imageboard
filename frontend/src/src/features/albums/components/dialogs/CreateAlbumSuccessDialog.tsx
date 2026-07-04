import Button from "@/ui/components/Buttons/Button/Button";
import DialogCard from "@/ui/components/Layout/DialogCard/DialogCard";

export default function CreateAlbumSuccessDialog({}: {}) {
    return (
        <DialogCard cardProps={{ style: { width: "450px" } }}>
            <span style={{ fontSize: "var(--font-size-3xl)" }}>
                Successfully created album{" "}
                <span style={{ color: "var(--tertiary)" }}>???????</span>
            </span>
            <Button aria-label={"OK"}>OK</Button>
        </DialogCard>
    );
}
