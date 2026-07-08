import Button from "@/ui/components/Buttons/Button/Button";
import DialogCard from "@/ui/components/Layout/DialogCard/DialogCard";

export default function CreateAlbumErrorDialog() {
    return (
        <DialogCard cardProps={{ style: { width: "450px" } }}>
            <span style={{ fontSize: "var(--font-size-3xl)" }}>
                Could not create album
            </span>
            <span style={{ fontSize: "var(--font-size-xl)" }}>
                Reason: Too many characters (Max{" "}
                <span style={{ color: "var(--tertiary)" }}>??</span>)
            </span>
            <Button aria-label={"OK"}>OK</Button>
        </DialogCard>
    );
}
