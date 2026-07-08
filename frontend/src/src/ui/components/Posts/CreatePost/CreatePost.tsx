import createPostStyle from "./CreatePost.module.css";
import DialogCard from "@/ui/components/Layout/DialogCard/DialogCard";
import {
    useRef,
    useState,
    type ReactNode,
    type Dispatch,
    type SetStateAction,
} from "react";
import type { Stage } from "@/ui/types/stages";
import Upload from "./Upload";
import Loading from "./Loading";
import Failure from "./Failure";
import Success from "./Success";
import { PostProvider } from "./context";
import useControllableState from "@/ui/hooks/useControllableState";
import { useModalContext } from "@/ui/components/Overlays/Modal/modal";

interface CreatePostProps {
    defaultStage?: Stage;
    currentStage?: Stage;
    onStageChange?: Dispatch<SetStateAction<Stage>>;
    children?: ReactNode;
}

export default function CreatePost({
    defaultStage = "Upload",
    currentStage,
    onStageChange,
}: CreatePostProps) {
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
            onChange: onStageChange,
        });

    const StageComponent = stages[internalCurrentStage ?? "Upload"];

    const postDataRef = useRef({
        errorMessage: "Some default error message.",
        postURL: "https://posturl.com/POSTID=3984829",
    });

    const onNextStage = (next: SetStateAction<Stage>) => {
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
                    onNextStage={onNextStage}
                />
            </PostProvider>
        </DialogCard>
    );
}
