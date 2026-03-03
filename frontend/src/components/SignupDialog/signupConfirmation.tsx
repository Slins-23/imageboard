import Button from "@/components/Button/button";
import stageStyle from "./stages.module.css";
import type { CSSProperties } from "react";

export default function SignupConfirmation() {
    return (
        <div
            className={`${stageStyle.wrapper}`}
            style={{ padding: "2rem" }}
        >
            <div
                className={`${stageStyle.contentWrapper}`}
                style={{
                    textAlign: "center",
                    pointerEvents: "none",
                    userSelect: "none",
                    MozUserSelect: "none",
                    msUserSelect: "none",
                    WebkitUserSelect: "none",
                }}
            >
                A confirmation link was sent to your e-mail. Open it in a
                browser to complete your registration.
            </div>
            <div className={`${stageStyle.buttonWrapper}`}>
                <Button
                    style={
                        {
                            fontSize: "var(--font-size-2xl)",
                            "--text-color": "var(--tertiary)",
                            "--text-color-hover": "var(--tertiary)",
                            "--bg-color-hover": "var(--primary)",
                        } as CSSProperties
                    }
                >
                    OK
                </Button>
            </div>
        </div>
    );
}
