"use client";

import { useControllableState } from "@/utils/utils";
import type { Stage, StageComponentArgs } from "./types";
import { usePostContext } from "./context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faLink } from "@fortawesome/free-solid-svg-icons";
import successStyle from "./success.module.css";
import Button from "@/components/Button/button";
import Tooltip from "@/components/Tooltip/tooltip";
import { useModalContext } from "@/components/Modal/modal";

export default function Success({
    defaultStage = "Success",
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
        <div className={successStyle.wrapper}>
            <FontAwesomeIcon
                icon={faCheck}
                className={successStyle.icon}
            />
            <div className={successStyle.secondaryWrapper}>
                <span className={successStyle.successText}>
                    Successfully uploaded
                </span>
                <div className={successStyle.buttonsWrapper}>
                    <Button
                        style={{ padding: "0em 1.675em" }}
                        onClick={() => modalContext.setInternalIsOpen(false)}
                    >
                        OK
                    </Button>
                    <Button
                        style={{ padding: "0.25em 0.4em" }}
                        onClick={async () => {
                            if (postContext.current === undefined) return;
                            if (postContext.current.postURL === undefined)
                                return;

                            await navigator.clipboard.writeText(
                                postContext.current.postURL
                            );

                            Tooltip("Successfully copied post URL!");
                        }}
                    >
                        COPY <FontAwesomeIcon icon={faLink} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
