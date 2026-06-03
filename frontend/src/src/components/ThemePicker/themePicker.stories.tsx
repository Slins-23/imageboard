import { StoryObj, Meta } from "@storybook/nextjs-vite";
import ThemePicker from "./themePicker";
import IconButton from "@/components/IconButton/iconButton";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import * as Modal from "@/components/Modal/modal";

const meta: Meta<typeof ThemePicker> = {
    title: "Components/ThemePicker",
    component: ThemePicker,
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
    args: {},
    render: (args) => {
        return (
            <div>
                <Modal.Root>
                    <Modal.Trigger
                        asChild
                        triggerValue={true}
                    >
                        <IconButton
                            aria-label="themeBtn"
                            btnIcon={faCircleHalfStroke}
                            width="50px"
                            height="50px"
                            iconSize="25px"
                            style={{
                                position: "absolute",
                                right: "10px",
                                bottom: "10px",
                            }}
                        />
                    </Modal.Trigger>
                    <Modal.Content>
                        <ThemePicker />
                    </Modal.Content>
                </Modal.Root>
            </div>
        );
    },
};
