import Button from "@/ui/components/Buttons/Button/Button";
import stageStyle from "./stages.module.css";
import signupConfirmationStyle from "./SignupConfirmation.module.css";

export default function SignupConfirmation() {
    return (
        <div
            className={stageStyle.wrapper}
            style={{ padding: "2rem" }}
        >
            <div
                className={`${stageStyle.contentWrapper} ${stageStyle.mainText}`}
            >
                A confirmation link was sent to your e-mail. Open it in a
                browser to complete your registration.
            </div>
            <div className={stageStyle.buttonWrapper}>
                <Button className={signupConfirmationStyle.okBtn}>OK</Button>
            </div>
        </div>
    );
}
