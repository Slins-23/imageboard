import stageStyle from "./stages.module.css";
import accountDetailsStyle from "./AccountDetails.module.css";
import Button from "@/ui/components/Buttons/Button/Button";
import { useState, useId } from "react";
import TextBox from "@/ui/components/Input/TextBox/TextBox";

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
                        className={accountDetailsStyle.textField}
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
                        className={accountDetailsStyle.textField}
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
                        className={accountDetailsStyle.textField}
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
                        className={accountDetailsStyle.textField}
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
                        className={accountDetailsStyle.signupBtn}
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
