import Button from "@/components/Button/button";
import LinkedAccount from "@/components/LinkedAccount/LinkedAccount";
import RadioButton from "@/components/RadioButton/radioButton";
import * as Modal from "@/components/Modal/modal";
import Card from "@/components/InterestCard/interestCard";
import { DropdownMenu } from "@/components/DropdownMenu/dropdownMenu";

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
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    gap: "5px",
                }}
            >
                <RadioButton
                    id="brazil"
                    name="this-group"
                    value="Brazil"
                />
                <label htmlFor="brazil">Brazil</label>
                <RadioButton
                    id="united-states"
                    name="this-group"
                    value="United States"
                />
                <label htmlFor="united-states">United States</label>
                <RadioButton
                    id="germany"
                    name="this-group"
                    value="Germany"
                />
                <label htmlFor="germany">Germany</label>
            </div>
            <div
                id="wrapper"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Button aria-label="Get country">Get country</Button>
            </div>
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
        </div>
    );
}
