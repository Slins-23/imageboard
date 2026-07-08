import {
    useRef,
    type MouseEvent,
    type KeyboardEvent,
    type ChangeEvent,
} from "react";
import { sleep } from "@/ui/utils/misc";
import useControllableState from "@/ui/hooks/useControllableState";
import type { Stage, StageComponentProps } from "@/ui/types/stages";
import uploadStyle from "./Upload.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { usePostContext } from "./context";

export default function Upload({
    defaultStage = "Upload",
    currentStage,
    onNextStage,
}: StageComponentProps) {
    const postContext = usePostContext();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const maxUploadSizeMB: number = 10;

    const [internalCurrentStage, setInternalCurrentStage] =
        useControllableState<Stage>({
            defaultValue: defaultStage,
            value: currentStage,
            onChange: onNextStage,
        });

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        if (inputRef.current?.disabled) {
            return;
        }

        inputRef.current?.click();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (inputRef.current?.disabled) {
            return;
        }

        switch (event.key) {
            case "Enter":
            case " ": {
                inputRef.current?.click();
                break;
            }
            default: {
                break;
            }
        }
    };

    const changeFileDialog = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null) return;

        setInternalCurrentStage("Loading");

        const maxDelay = 8000;
        const randomDelay = Math.round(Math.random()) * maxDelay;

        await sleep(randomDelay);

        const randomResult = Math.round(Math.random());

        if (randomResult === 1) {
            const randomPostID = crypto.randomUUID();
            const postURL = `https://thewebsite.com/post/POSTID=${randomPostID}`;
            postContext.current.postURL = postURL;

            setInternalCurrentStage("Success");
        } else {
            const messageA = "Connection interrupted.";
            const messageB = "File format not supported.";
            const messageC = "You must be logged in.";
            const msgIdx = Math.round(Math.random() * 2);
            const finalMsg = [messageA, messageB, messageC][msgIdx];
            postContext.current.errorMessage = finalMsg;

            setInternalCurrentStage("Failure");
        }
    };

    return (
        <div
            role="button"
            className={uploadStyle.wrapper}
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <FontAwesomeIcon
                icon={faFileImage}
                className={uploadStyle.icon}
                style={{
                    width: "130px",
                    height: "170px",
                }}
            />
            <span style={{ fontSize: "var(--font-size-3xl)" }}>
                Select or drag image to upload (Max size{" "}
                <span style={{ color: "var(--tertiary)" }}>
                    {maxUploadSizeMB}MB
                </span>
                )
            </span>

            <input
                ref={inputRef}
                type="file"
                style={{ display: "none" }}
                onChange={changeFileDialog}
                hidden={true}
            />
        </div>
    );
}
