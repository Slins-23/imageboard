import Button from "@/components/Button/button";
import DialogCard from "./dialogCard";

export default function SignupConfirmationDialog({
    onOk,
}: {
    onOk?: (...params: any[]) => void;
}) {
    return (
        <DialogCard cardProps={{ style: { width: "450px" } }}>
            <span style={{ fontSize: "var(--font-size-2xl)" }}>
                A confirmation link was sent to your e-mail. Open it in a
                browser to complete your signature.
            </span>
            <Button
                aria-label={"OK"}
                onClick={onOk}
            >
                OK
            </Button>
        </DialogCard>
    );
}
