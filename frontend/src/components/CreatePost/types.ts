import type { ReactNode } from "react";

export type Stage = "Upload" | "Loading" | "Failure" | "Success";

export interface StageComponentArgs {
    children?: ReactNode;
    defaultStage?: Stage;
    currentStage?: Stage;
    onStageChange?: (next: Stage) => void;
}
