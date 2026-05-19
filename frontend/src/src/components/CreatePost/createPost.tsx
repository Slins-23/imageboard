import createPostStyle from "./createPost.module.css";
import DialogCard from "@/components/DialogCard/dialogCard";
import { useRef, useState, useContext, createContext, ReactNode } from "react";
import type { Stage } from "./types";
import Upload from "./upload";
import Loading from "./loading";
import Failure from "./failure";
import Success from "./success";
import { PostProvider } from "./context";
import { useControllableState } from "@/utils/utils";
import { useModalContext } from "@/components/Modal/modal";

interface CreatePostArgs {
    defaultStage?: Stage;
    currentStage?: Stage;
    onStageChanged?: (next: Stage) => void;
    children?: ReactNode;
}

export default function CreatePost({
    defaultStage = "Upload",
    currentStage = undefined,
    onStageChanged = undefined,
    children = undefined,
}: CreatePostArgs) {
    const { internalIsDismissible } = useModalContext();

    const stages = {
        Upload,
        Loading,
        Failure,
        Success,
    };

    const [isVisible, setIsVisible] = useState(true);

    const fadeOutDuration = 1000;
    const fadeInDuration = 3000;
    const transitionDuration = useRef(fadeOutDuration);

    // const [currentStage, setCurrentStage] = useState<Stage>(defaultStage);
    const [internalCurrentStage, setInternalCurrentStage] =
        useControllableState<Stage>({
            defaultValue: defaultStage,
            value: currentStage,
            onChange: onStageChanged,
        });

    const StageComponent = stages[internalCurrentStage ?? "Upload"];

    const postDataRef = useRef({
        errorMessage: "Some default error message.",
        postURL: "https://posturl.com/POSTID=3984829",
    });

    const onStageChange = (next: Stage) => {
        if (next === "Loading") internalIsDismissible.current = false;

        transitionDuration.current = fadeOutDuration;
        setIsVisible(false);

        setTimeout(() => {
            setInternalCurrentStage(next);
            transitionDuration.current = fadeInDuration;
            setIsVisible(true);

            if (next !== "Loading") internalIsDismissible.current = true;
        }, transitionDuration.current);
    };

    return (
        <DialogCard
            cardProps={{
                className: createPostStyle.card,
                style: {
                    backgroundColor: "var(--primary)",
                },
            }}
            wrapperArgs={{
                style: {
                    borderRadius: "inherit",
                    padding: "0",
                    opacity: isVisible ? "1" : "0",
                    transitionProperty: "opacity",
                    transitionDuration: `${transitionDuration.current}ms`,
                },
            }}
        >
            <PostProvider value={postDataRef}>
                <StageComponent
                    currentStage={internalCurrentStage}
                    onStageChange={onStageChange}
                />
            </PostProvider>
        </DialogCard>
    );
}
