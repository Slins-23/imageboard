import BaseThemePicker from "@/ui/components/Preferences/ThemePicker/ThemePicker";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import * as Modal from "@/ui/components/Overlays/Modal/modal";

export default function ThemePicker() {
    return (
        <Modal.Root>
            <Modal.Trigger
                triggerValue={true}
                asChild
            >
                <IconButton
                    style={{
                        position: "fixed",
                        bottom: "10px",
                        right: "10px",
                    }}
                    icon={faCircleHalfStroke}
                    width="50px"
                    height="50px"
                    iconSize="25px"
                />
            </Modal.Trigger>
            <Modal.Content
                backgroundBlurOpacity="0"
                backgroundBlurRadius="0"
            >
                {/* <div
                            style={{
                                backgroundColor: "var(--primary)",
                                outlineWidth: "2px",
                                outlineStyle: "solid",
                                outlineColor: "var(--tertiary)",
                                backdropFilter: "blur(1px)",
                            }}
                        > */}
                <BaseThemePicker />
                {/* </div> */}
            </Modal.Content>
        </Modal.Root>
    );
}
