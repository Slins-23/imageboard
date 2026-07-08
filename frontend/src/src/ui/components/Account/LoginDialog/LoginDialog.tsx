import stageStyle from "@/ui/components/Account/SignupDialog/stages.module.css";
import SignupDialog from "@/ui/components/Account/SignupDialog/SignupDialog";
import Button from "@/ui/components/Buttons/Button/Button";
import TextBox from "@/ui/components/Input/TextBox/TextBox";
import { useState, useId } from "react";
import LinkAccount from "./LinkAccount";
import loginDialogStyle from "./LoginDialog.module.css";

export default function LoginDialog() {
    const [userId, setUserId] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const userFieldId = useId();
    const passwordFieldId = useId();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    return (
        <SignupDialog style={{ height: "680px" }}>
            <div
                className={stageStyle.wrapper}
                style={{ padding: "1.5rem" }}
            >
                <div
                    className={stageStyle.contentWrapper}
                    style={{
                        gap: "1.75rem",
                    }}
                >
                    <span className={stageStyle.title}>
                        Log into your account
                    </span>
                    <div className={loginDialogStyle.linkAccountWrapper}>
                        <LinkAccount
                            src="social-media/google.svg"
                            name="Google"
                            iconWidth="var(--font-size-2xl)"
                            iconHeight="var(--font-size-2xl)"
                            onClick={() => alert("Google login clicked!")}
                        />
                        <LinkAccount
                            src="social-media/facebook.svg"
                            name="Facebook"
                            iconWidth="var(--font-size-2xl)"
                            iconHeight="var(--font-size-2xl)"
                            onClick={() => alert("Facebook login clicked!")}
                        />
                        <LinkAccount
                            src="social-media/instagram.svg"
                            name="Instagram"
                            iconWidth="var(--font-size-2xl)"
                            iconHeight="var(--font-size-2xl)"
                            onClick={() => alert("Instagram login clicked!")}
                        />
                        <LinkAccount
                            src="social-media/x.svg"
                            name="X"
                            iconWidth="var(--font-size-2xl)"
                            iconHeight="var(--font-size-2xl)"
                            onClick={() => alert("X login clicked!")}
                        />

                        <LinkAccount
                            src="social-media/reddit.svg"
                            name="Reddit"
                            iconWidth="var(--font-size-2xl)"
                            iconHeight="var(--font-size-2xl)"
                            onClick={() => alert("Reddit login clicked!")}
                        />
                    </div>
                    <div className={loginDialogStyle.fieldsWrapper}>
                        <TextBox
                            id={userFieldId}
                            placeholder="E-mail or username"
                            className={loginDialogStyle.textField}
                            maxLength={255}
                            value={userId}
                            onTextChange={setUserId}
                        />
                        <TextBox
                            id={passwordFieldId}
                            placeholder="Password"
                            className={loginDialogStyle.textField}
                            maxLength={255}
                            value={password}
                            type="password"
                            onTextChange={setPassword}
                        />
                    </div>
                </div>
                <div className={stageStyle.footerWrapper}>
                    <Button
                        className={loginDialogStyle.resetPassword}
                        onClick={() => alert("Reset your password")}
                    >
                        Forgot your login info?
                    </Button>
                    <div
                        className={`${stageStyle.buttonWrapper} ${loginDialogStyle.extraButtonWrapper}`}
                    >
                        <span
                            className={stageStyle.errorMessage}
                            data-has-error={errorMessage !== null}
                        >
                            {errorMessage ?? "None"}
                        </span>
                        <Button
                            className={loginDialogStyle.loginBtn}
                            onClick={() =>
                                setErrorMessage("Error: Invalid credentials.")
                            }
                        >
                            Log in
                        </Button>
                    </div>
                </div>
            </div>
        </SignupDialog>
    );
}
