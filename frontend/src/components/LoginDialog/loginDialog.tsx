import stageStyle from "@/components/SignupDialog/stages.module.css";
import SignupDialog from "@/components/SignupDialog/signupDialog";
import Button from "@/components/Button/button";
import TextBox from "@/components/TextBox/textBox";
import { type CSSProperties, useState, useId } from "react";
import LinkAccount from "./linkAccount";

export default function LoginDialog() {
    const [userId, setUserId] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const userFieldId = useId();
    const passwordFieldId = useId();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    return (
        <SignupDialog style={{ height: "680px" }}>
            <div
                className={`${stageStyle.wrapper}`}
                style={{ padding: "1.5rem", height: "auto" }}
            >
                <div
                    className={`${stageStyle.contentWrapper}`}
                    style={{
                        justifyContent: "start",
                        gap: "1.75rem",
                        position: "relative",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <span
                        style={{
                            textAlign: "center",
                            fontSize: "var(--font-size-2xl)",
                            color: "var(--tertiary)",
                            pointerEvents: "none",
                            userSelect: "none",
                            MozUserSelect: "none",
                            msUserSelect: "none",
                            WebkitUserSelect: "none",
                        }}
                    >
                        Log into your account
                    </span>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <LinkAccount
                            src="social-media/google.svg"
                            name="Google"
                            iconWidth="var(--font-size-2xl)"
                            iconHeight="var(--font-size-2xl)"
                            onClick={() => alert("Google login clicked!")}
                            style={
                                {
                                    "--bg-color-hover": "var(--primary)",
                                    "--text-color-hover": "var(--tertiary)",
                                    width: "300px",
                                    borderRadius: "10px",
                                    fontSize: "var(--font-size-xl)",
                                    padding: "0.3em 0.9em",
                                } as CSSProperties
                            }
                        />
                        <LinkAccount
                            src="social-media/facebook.svg"
                            name="Facebook"
                            iconWidth="var(--font-size-2xl)"
                            iconHeight="var(--font-size-2xl)"
                            onClick={() => alert("Facebook login clicked!")}
                            style={
                                {
                                    "--bg-color-hover": "var(--primary)",
                                    "--text-color-hover": "var(--tertiary)",
                                    width: "300px",
                                    borderRadius: "10px",
                                    fontSize: "var(--font-size-xl)",
                                    padding: "0.3em 0.9em",
                                } as CSSProperties
                            }
                        />
                        <LinkAccount
                            src="social-media/instagram.svg"
                            name="Instagram"
                            iconWidth="var(--font-size-2xl)"
                            iconHeight="var(--font-size-2xl)"
                            onClick={() => alert("Instagram login clicked!")}
                            style={
                                {
                                    "--bg-color-hover": "var(--primary)",
                                    "--text-color-hover": "var(--tertiary)",
                                    width: "300px",
                                    borderRadius: "10px",
                                    fontSize: "var(--font-size-xl)",
                                    padding: "0.3em 0.9em",
                                } as CSSProperties
                            }
                        />
                        <LinkAccount
                            src="social-media/x.svg"
                            name="X"
                            iconWidth="var(--font-size-2xl)"
                            iconHeight="var(--font-size-2xl)"
                            onClick={() => alert("X login clicked!")}
                            style={
                                {
                                    "--bg-color-hover": "var(--primary)",
                                    "--text-color-hover": "var(--tertiary)",
                                    width: "300px",
                                    borderRadius: "10px",
                                    fontSize: "var(--font-size-xl)",
                                    padding: "0.3em 0.9em",
                                } as CSSProperties
                            }
                        />

                        <LinkAccount
                            src="social-media/reddit.svg"
                            name="Reddit"
                            iconWidth="var(--font-size-2xl)"
                            iconHeight="var(--font-size-2xl)"
                            onClick={() => alert("Reddit login clicked!")}
                            style={
                                {
                                    "--bg-color-hover": "var(--primary)",
                                    "--text-color-hover": "var(--tertiary)",
                                    width: "300px",
                                    borderRadius: "10px",
                                    fontSize: "var(--font-size-xl)",
                                    padding: "0.3em 0.9em",
                                } as CSSProperties
                            }
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.5rem",
                        }}
                    >
                        <TextBox
                            id={userFieldId}
                            placeholder="E-mail or username"
                            style={{
                                backgroundColor: "rgba(0, 0, 0, 0)",
                                padding: "1em 0.75em",
                                width: "300px",
                                fontSize: "var(--font-size-lg)",
                            }}
                            maxLength={255}
                            value={userId}
                            onTextChange={setUserId}
                        />
                        <TextBox
                            id={passwordFieldId}
                            placeholder="Password"
                            style={{
                                backgroundColor: "rgba(0, 0, 0, 0)",
                                padding: "1em 0.75em",
                                width: "300px",
                                fontSize: "var(--font-size-lg)",
                            }}
                            maxLength={255}
                            value={password}
                            type="password"
                            onTextChange={setPassword}
                        />
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1.25rem",
                        marginTop: "1.25rem",
                    }}
                >
                    <Button
                        onClick={() => alert("Reset your password")}
                        style={{
                            background: "none",
                            border: "none",
                            display: "inline",
                            padding: "0",
                            color: "var(--tertiary)",
                            fontSize: "var(--font-size-lg)",
                            cursor: "pointer",
                            userSelect: "none",
                            MozUserSelect: "none",
                            msUserSelect: "none",
                            WebkitUserSelect: "none",
                        }}
                    >
                        Forgot your login info?
                    </Button>
                    <div
                        className={`${stageStyle.buttonWrapper}`}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        <span
                            style={{
                                visibility:
                                    errorMessage === null
                                        ? "hidden"
                                        : "visible",
                                color: "var(--accent)",
                                fontSize: "var(--font-size-lg)",
                            }}
                        >
                            {errorMessage ?? "None"}
                        </span>
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
