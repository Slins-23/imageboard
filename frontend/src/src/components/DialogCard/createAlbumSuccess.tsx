import Button from "@/components/Button/button";
import DialogCard from "./dialogCard";

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
