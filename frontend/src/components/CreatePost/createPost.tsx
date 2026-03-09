import createPostStyle from "./createPost.module.css";
import DialogCard from "@/components/DialogCard/dialogCard";
import { useRef, useState, useContext, createContext, ReactNode } from "react";
import type { Stage } from "./types";
import Upload from "./upload";
import Loading from "./loading";
import Failure from "./failure";
import Success from "./success";
import { PostProvider } from "./context";

interface CreatePostArgs {
    defaultStage?: Stage;
    children?: ReactNode;
}

export default function CreatePost({
    defaultStage = "Upload",
    children = undefined,
}: CreatePostArgs) {
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

    const [currentStage, setCurrentStage] = useState<Stage>(defaultStage);
    const StageComponent = stages[currentStage];

    const postDataRef = useRef({
        errorMessage: "Some default error message.",
        postURL: "https://posturl.com/POSTID=3984829",
    });

    const onStageChange = (next: Stage) => {
        transitionDuration.current = fadeOutDuration;
        setIsVisible(false);

        setTimeout(() => {
            setCurrentStage(next);
            transitionDuration.current = fadeInDuration;
            setIsVisible(true);
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
                    currentStage={currentStage}
                    onStageChange={onStageChange}
                />
            </PostProvider>
        </DialogCard>
    );
}
