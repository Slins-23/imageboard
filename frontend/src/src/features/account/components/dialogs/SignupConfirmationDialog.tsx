import Button from "@/ui/components/Buttons/Button/Button";
import DialogCard from "@/ui/components/Layout/DialogCard/DialogCard";

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
