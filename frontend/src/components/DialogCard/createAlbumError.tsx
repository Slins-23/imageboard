import Button from "@/components/Button/button";
import DialogCard from "./dialogCard";

export default function CreateAlbumErrorDialog({}: {}) {
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
