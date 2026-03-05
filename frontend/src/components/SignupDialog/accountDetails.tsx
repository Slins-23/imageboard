import stageStyle from "./stages.module.css";
import Button from "@/components/Button/button";
import { type CSSProperties, useState, useId } from "react";
import TextBox from "@/components/TextBox/textBox";

export default function AccountDetails() {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] =
        useState<string>("");

    const emailId = useId();
    const usernameId = useId();
    const passwordId = useId();
    const passwordConfirmationId = useId();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    return (
        <div
            className={stageStyle.wrapper}
            style={{ padding: "2rem" }}
        >
            <div
                className={stageStyle.contentWrapper}
                style={{
                    gap: "2.75rem",
                }}
            >
                <span className={stageStyle.title}>Create your account</span>
                <div className={stageStyle.fieldGrid}>
                    <label
                        htmlFor={emailId}
                        className={stageStyle.label}
                    >
                        E-mail
                    </label>
                    <TextBox
                        id={emailId}
                        style={{
                            width: "186px",
                            backgroundColor: "rgba(0, 0, 0, 0)",
                            padding: "0.75em 0.5em",
                            fontSize: "var(--font-size-lg)",
                        }}
                        maxLength={255}
                        value={email}
                        onTextChange={setEmail}
                    />
                    <label
                        htmlFor={usernameId}
                        className={stageStyle.label}
                    >
                        Username
                    </label>
                    <TextBox
                        id={usernameId}
                        style={{
                            width: "186px",
                            backgroundColor: "rgba(0, 0, 0, 0)",
                            padding: "0.75em 0.5em",
                            fontSize: "var(--font-size-lg)",
                        }}
                        maxLength={255}
                        value={username}
                        onTextChange={setUsername}
                    />
                    <label
                        htmlFor={passwordId}
                        className={stageStyle.label}
                    >
                        Password
                    </label>
                    <TextBox
                        id={passwordId}
                        style={{
                            width: "186px",
                            backgroundColor: "rgba(0, 0, 0, 0)",
                            padding: "0.75em 0.5em",
                            fontSize: "var(--font-size-lg)",
                        }}
                        maxLength={255}
                        value={password}
                        type="password"
                        onTextChange={setPassword}
                    />
                    <label
                        htmlFor={passwordConfirmationId}
                        className={stageStyle.label}
                    >
                        Confirm
                    </label>
                    <TextBox
                        id={passwordConfirmationId}
                        style={{
                            width: "186px",
                            backgroundColor: "rgba(0, 0, 0, 0)",
                            padding: "0.75em 0.5em",
                            fontSize: "var(--font-size-lg)",
                        }}
                        maxLength={255}
                        value={passwordConfirmation}
                        type="password"
                        onTextChange={setPasswordConfirmation}
                    />
                </div>
            </div>
            <div className={stageStyle.footerWrapper}>
                <span
                    className={stageStyle.errorMessage}
                    data-has-error={errorMessage !== null}
                >
                    {errorMessage ?? "None"}
                </span>
                <div className={stageStyle.buttonWrapper}>
                    <Button
                        style={
                            {
                                fontSize: "var(--font-size-2xl)",
                                "--text-color": "var(--tertiary)",
                                "--text-color-hover": "var(--tertiary)",
                                "--bg-color-hover": "var(--primary)",
                            } as CSSProperties
                        }
                        onClick={() =>
                            setErrorMessage(
                                "Error: Submission logic not yet implemented."
                            )
                        }
                    >
                        Sign up
                    </Button>
                </div>
            </div>
        </div>
    );
}
