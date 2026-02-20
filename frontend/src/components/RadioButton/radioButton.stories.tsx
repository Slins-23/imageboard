import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import RadioButton from "./radioButton";
import { useState } from "storybook/internal/preview-api";
import Button from "@/components/Button/button";

const meta: Meta<typeof RadioButton> = {
    title: "Components/RadioButton",
    component: RadioButton,
};

export default meta;

export const Group: StoryObj<typeof meta> = {
    args: {
        "aria-label": "Uncontrolled",
        name: "uncontrolled",
        value: "uncontrolled-1",
    },
    render: () => {
        const [selected, setSelected] = useState<string>("Brazil");

        return (
            <>
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
                        name="countries"
                        value="Brazil"
                        selectedValue={selected}
                        onSelectedChange={setSelected}
                    />
                    <label htmlFor="brazil">Brazil</label>
                    <RadioButton
                        id="united-states"
                        name="countries"
                        value="United States"
                        selectedValue={selected}
                        onSelectedChange={setSelected}
                    />
                    <label htmlFor="united-states">United States</label>
                    <RadioButton
                        id="germany"
                        name="countries"
                        value="Germany"
                        selectedValue={selected}
                        onSelectedChange={setSelected}
                    />
                    <label htmlFor="germany">Germany</label>
                </div>
                <br></br>
                <div
                    id="wrapper"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        aria-label="Get country"
                        onClick={() => {
                            const selectedElement = document.querySelector(
                                "input[name='countries']:checked"
                            ) as HTMLInputElement | null;

                            alert(
                                `You chose the country ${selectedElement?.value}`
                            );
                        }}
                    >
                        Get country
                    </Button>
                </div>
            </>
        );
    },
};
