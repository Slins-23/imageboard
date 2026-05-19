import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import RadioButton from "./radioButton";
import { useArgs } from "storybook/internal/preview-api";
import Button from "@/components/Button/button";
import RadioGroup from "./radioGroup";
import type { OptionValue } from "./types";

const meta: Meta<typeof RadioGroup> = {
    title: "Components/RadioGroup",
    component: RadioGroup,
    argTypes: {
        selectedValue: { control: "text" },
        defaultSelectedValue: { control: "text" },
    },
};

export default meta;

export const GroupControlled: StoryObj<typeof meta> = {
    args: {
        selectedValue: "Bundesliga",
        groupName: "leagues",
        onSelected: () => alert("An option was clicked!"),
    },
    render: (args) => {
        const [, setArgs] = useArgs();
        const setSelected = (selectedValue: OptionValue) =>
            setArgs({ selectedValue });

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    justifyContent: "center",
                    gap: "2rem",
                }}
            >
                <RadioGroup
                    onSelectedChange={setSelected}
                    {...args}
                >
                    <RadioButton
                        value={"Brasileirão"}
                        label={"Brazil"}
                        onSelected={() => alert("Option 1 was clicked!")}
                    />
                    <RadioButton
                        value={"MLS"}
                        label={"United States"}
                        onSelected={() => alert("Option 2 was clicked!")}
                    />
                    <RadioButton
                        value={"Bundesliga"}
                        label={"Germany"}
                        onSelected={() => alert("Option 3 was clicked!")}
                    />
                </RadioGroup>
                <center>
                    <Button
                        aria-label="Get league"
                        onClick={() => {
                            alert(`You chose the league ${args.selectedValue}`);
                        }}
                        style={{ width: "50%" }}
                    >
                        Get league
                    </Button>
                </center>
            </div>
        );
    },
};

export const GroupUncontrolled: StoryObj<typeof meta> = {
    args: {
        defaultSelectedValue: "Bundesliga",
        groupName: "leagues",
    },
    render: (args) => {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    justifyContent: "center",
                    gap: "2rem",
                }}
            >
                <RadioGroup
                    {...args}
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
                        aria-label="Get league"
                        onClick={() => {
                            const selectedElement = document.querySelector(
                                "input[name='leagues']:checked"
                            ) as HTMLInputElement | null;

                            alert(
                                `You chose the league ${selectedElement?.value}`
                            );
                        }}
                        style={{ width: "50%" }}
                    >
                        Get league
                    </Button>
                </center>
            </div>
        );
    },
};
