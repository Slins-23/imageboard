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
            className={`${stageStyle.wrapper}`}
            style={{ padding: "2rem", height: "auto" }}
        >
            <div
                className={`${stageStyle.contentWrapper}`}
                style={{
                    justifyContent: "start",
                    gap: "2.75rem",
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
                    Create your account
                </span>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "max-content 1fr",
                        columnGap: "2rem",
                        rowGap: "1.5rem",
                        // width: "80%",
                        alignSelf: "start",
                        marginLeft: "1.5rem",
                    }}
                >
                    <label
                        htmlFor={emailId}
                        style={{
                            fontSize: "var(--font-size-xl)",
                            pointerEvents: "none",
                            userSelect: "none",
                            MozUserSelect: "none",
                            msUserSelect: "none",
                            WebkitUserSelect: "none",
                        }}
                    >
                        E-mail
                    </label>
                    <TextBox
                        id={emailId}
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0)",
                            padding: "0.75em 0.5em",
                            width: "186px",
                            fontSize: "var(--font-size-lg)",
                        }}
                        maxLength={255}
                        value={email}
                        onTextChange={setEmail}
                    />
                    <label
                        htmlFor={usernameId}
                        style={{
                            fontSize: "var(--font-size-xl)",
                            pointerEvents: "none",
                            userSelect: "none",
                            MozUserSelect: "none",
                            msUserSelect: "none",
                            WebkitUserSelect: "none",
                        }}
                    >
                        Username
                    </label>
                    <TextBox
                        id={usernameId}
                        width={"186px"}
                        // height={"30px"}
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0)",
                            padding: "0.75em 0.5em",
                            width: "186px",
                            fontSize: "var(--font-size-lg)",
                        }}
                        maxLength={255}
                        value={username}
                        onTextChange={setUsername}
                    />
                    <label
                        htmlFor={passwordId}
                        style={{
                            fontSize: "var(--font-size-xl)",
                            pointerEvents: "none",
                            userSelect: "none",
                            MozUserSelect: "none",
                            msUserSelect: "none",
                            WebkitUserSelect: "none",
                        }}
                    >
                        Password
                    </label>
                    <TextBox
                        id={passwordId}
                        width={"186px"}
                        // height={"30px"}
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0)",
                            padding: "0.75em 0.5em",
                            width: "186px",
                            fontSize: "var(--font-size-lg)",
                        }}
                        maxLength={255}
                        value={password}
                        type="password"
                        onTextChange={setPassword}
                    />
                    <label
                        htmlFor={passwordConfirmationId}
                        style={{
                            fontSize: "var(--font-size-xl)",
                            pointerEvents: "none",
                            userSelect: "none",
                            MozUserSelect: "none",
                            msUserSelect: "none",
                            WebkitUserSelect: "none",
                        }}
                    >
                        Confirm
                    </label>
                    <TextBox
                        id={passwordConfirmationId}
                        width={"186px"}
                        // height={"30px"}
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0)",
                            padding: "0.75em 0.5em",
                            width: "186px",
                            fontSize: "var(--font-size-lg)",
                        }}
                        maxLength={255}
                        value={passwordConfirmation}
                        type="password"
                        onTextChange={setPasswordConfirmation}
                    />
                    {/* </div> */}
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
                <span
                    style={{
                        visibility:
                            errorMessage === null ? "hidden" : "visible",
                        color: "var(--tertiary)",
                        fontSize: "var(--font-size-lg)",
                        textAlign: "center",
                    }}
                >
                    {errorMessage ?? "None"}
                </span>
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
