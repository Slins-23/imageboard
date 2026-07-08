import type { ReactNode, Dispatch, SetStateAction } from "react";

export type Stage = "Upload" | "Loading" | "Failure" | "Success";

export interface StageComponentProps {
    children?: ReactNode;
    defaultStage?: Stage;
    currentStage?: Stage;
    onNextStage?: Dispatch<SetStateAction<Stage>>;
}
