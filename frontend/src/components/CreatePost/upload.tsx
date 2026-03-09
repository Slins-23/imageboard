import {
    useRef,
    type MouseEvent,
    type KeyboardEvent,
    ChangeEvent,
} from "react";
import { delay, useControllableState } from "@/utils/utils";
import type { Stage, StageComponentArgs } from "./types";
import uploadStyle from "./upload.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { usePostContext } from "./context";

export default function Upload({
    defaultStage = "Upload",
    currentStage = undefined,
    onStageChange = undefined,
}: StageComponentArgs) {
    const postContext = usePostContext();

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const maxUploadSizeMB: number = 10;

    const [internalCurrentStage, setInternalCurrentStage] =
        useControllableState<Stage>({
            defaultValue: defaultStage,
            value: currentStage,
            onChange: onStageChange,
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

        switch (event.code) {
            case "Enter":
            case "Space": {
                wrapperRef.current?.click();
                break;
            }
        }
    };

    const changeFileDialog = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null) return;

        setInternalCurrentStage("Loading");

        const maxDelay = 8000;
        const randomDelay = Math.round(Math.random() * maxDelay);

        await delay(randomDelay);

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
            ref={wrapperRef}
            className={uploadStyle.wrapper}
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <FontAwesomeIcon
                icon={faFileImage}
                className={uploadStyle.icon}
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
