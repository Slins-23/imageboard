"use client";
import LinkedAccount from "@/components/LinkedAccount/LinkedAccount";
import * as Modal from "@/components/Modal/modal";
import Card from "@/components/InterestCard/interestCard";
import { DropdownMenu } from "@/components/DropdownMenu/dropdownMenu";
import RadioButton from "@/components/RadioGroup/radioButton";
import RadioGroup from "@/components/RadioGroup/radioGroup";
import Button from "@/components/Button/button";
import CreatePost from "@/components/CreatePost/createPost";

export default function Profile() {
    return (
        <div
            style={{
                backgroundColor: "var(--primary)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
            }}
        >
            Profile page
            <br></br>
            <br></br>
            <RadioGroup
                defaultSelectedValue="MLS"
                groupName="leagues"
            >
                <RadioButton
                    value={"Brasileirão"}
                    label={"Brazil"}
                />
                <RadioButton
                    value={"MLS"}
                    label={"United States"}
                />
                <RadioButton
                    value={"Bundesliga"}
                    label={"Germany"}
                />
            </RadioGroup>
            <center>
                <Button
                    aria-label="Get country"
                    onClick={() => {
                        const selectedElement = document.querySelector(
                            "input[name='leagues']:checked"
                        ) as HTMLInputElement | null;

                        alert(
                            `You chose the country ${selectedElement?.value}`
                        );
                    }}
                    style={{ width: "50%" }}
                >
                    Get league
                </Button>
            </center>
            <br></br>
            <div
                id="wrapper"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            ></div>
            <br></br>
            <div
                id="list"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    alignItems: "center",
                }}
            >
                <LinkedAccount
                    iconSrc="/social-media/google.svg"
                    wrapperWidth="900px"
                />
                <LinkedAccount
                    iconSrc="/social-media/facebook.svg"
                    wrapperWidth="900px"
                />
                <LinkedAccount
                    iconSrc="/social-media/instagram.svg"
                    wrapperWidth="900px"
                />
                <LinkedAccount
                    iconSrc="/social-media/x.svg"
                    wrapperWidth="900px"
                />
                <LinkedAccount
                    iconSrc="/social-media/reddit.svg"
                    wrapperWidth="900px"
                />
            </div>
            <Modal.Root>
                <Modal.Trigger triggerValue={true} />
                <Modal.Content>
                    <Card />
                    <Modal.Trigger triggerValue={false} />
                </Modal.Content>
            </Modal.Root>
            <br />
            <br />
            <DropdownMenu
                dropdownEntries={[
                    { value: "Opt1" },
                    { value: "Opt2" },
                    { value: "Opt3 A IO K OW PQ OW" },
                ]}
            />
            <Modal.Root>
                <Modal.Trigger
                    triggerValue={true}
                    asChild
                >
                    <Button>Create Post</Button>
                </Modal.Trigger>
                <Modal.Content>
                    <CreatePost />
                </Modal.Content>
            </Modal.Root>
        </div>
    );
}
