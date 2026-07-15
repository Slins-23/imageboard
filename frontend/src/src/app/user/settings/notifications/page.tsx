import Button from "@/ui/components/Buttons/Button/Button";
import pageStyle from "./page.module.css";
import ToggleSwitch from "@/ui/components/Input/ToggleSwitch/ToggleSwitch";

export default function Notifications() {
    return (
        <div className={pageStyle.pageWrapper}>
            <span className={pageStyle.title}>Notifications</span>

            <div className={pageStyle.inputWrapper}>
                <label
                    htmlFor="likes"
                    className={pageStyle.inputLabel}
                >
                    Likes
                </label>
                <ToggleSwitch
                    aria-label="likes"
                    name="likes"
                />
                <label
                    htmlFor="comments"
                    className={pageStyle.inputLabel}
                >
                    Comments
                </label>
                <ToggleSwitch
                    aria-label="comments"
                    name="comments"
                />

                <label
                    htmlFor="follows"
                    className={pageStyle.inputLabel}
                >
                    Follows
                </label>
                <ToggleSwitch
                    aria-label="follows"
                    name="follows"
                />
                <label
                    htmlFor="replies"
                    className={pageStyle.inputLabel}
                >
                    Replies
                </label>
                <ToggleSwitch
                    aria-label="replies"
                    name="replies"
                />
                <label
                    htmlFor="messages"
                    className={pageStyle.inputLabel}
                >
                    Messages
                </label>
                <ToggleSwitch
                    aria-label="messages"
                    name="messages"
                />
            </div>
            <Button className={pageStyle.saveBtn}>Save changes</Button>
        </div>
    );
}
