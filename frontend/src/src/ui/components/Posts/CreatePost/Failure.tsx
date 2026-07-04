import useControllableState from "@/ui/hooks/useControllableState";
import type { Stage, StageComponentArgs } from "./types";
import { usePostContext } from "./context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import failureStyle from "./Failure.module.css";
import Button from "@/ui/components/Buttons/Button/Button";
import { useModalContext } from "@/ui/components/Overlays/Modal/modal";

export default function Failure({
    defaultStage = "Failure",
    currentStage = undefined,
    onStageChange = undefined,
}: StageComponentArgs) {
    const postContext = usePostContext();
    const modalContext = useModalContext();

    const [internalCurrentStage, setInternalCurrentStage] =
        useControllableState<Stage>({
            defaultValue: defaultStage,
            value: currentStage,
            onChange: onStageChange,
        });

    return (
        <div className={failureStyle.wrapper}>
            <FontAwesomeIcon
                icon={faWarning}
                className={failureStyle.icon}
            />
            <div className={failureStyle.secondaryWrapper}>
                <span className={failureStyle.failText}>
                    Could not upload image
                </span>
                <span className={failureStyle.reasonText}>
                    Reason:{" "}
                    <span style={{ color: "var(--tertiary)" }}>
                        {postContext.current.errorMessage}
                    </span>
                </span>
            </div>
            <Button
                style={{ padding: "0.25em 1.675em", marginTop: "0.15em" }}
                onClick={() => modalContext.setInternalIsOpen(false)}
            >
                OK
            </Button>
        </div>
    );
}
