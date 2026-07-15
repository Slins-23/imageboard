import Button from "@/ui/components/Buttons/Button/Button";
import TextBox from "@/ui/components/Input/TextBox/TextBox";
import DropdownMenu from "@/ui/components/Input/DropdownMenu/DropdownMenu";
import RadioButton from "@/ui/components/Input/RadioGroup/RadioButton";
import RadioGroup from "@/ui/components/Input/RadioGroup/RadioGroup";
import pageStyle from "./page.module.css";

export default function Credentials() {
    return (
        <div className={pageStyle.pageWrapper}>
            <span className={pageStyle.title}>Credentials</span>
            <div className={pageStyle.inputWrapper}>
                <label
                    className={pageStyle.inputLabel}
                    htmlFor="email"
                >
                    E-mail
                </label>
                <TextBox
                    className={pageStyle.inputField}
                    name="email"
                    aria-label="email"
                    placeholder="Your e-mail"
                />

                <label
                    className={pageStyle.inputLabel}
                    htmlFor="password"
                >
                    Password
                </label>
                <TextBox
                    type="password"
                    className={pageStyle.inputField}
                    name="password"
                    aria-label="password"
                    placeholder="Your password"
                />

                <label
                    className={pageStyle.inputLabel}
                    htmlFor="birthdate"
                >
                    Birthdate
                </label>
                <TextBox
                    type="date"
                    className={pageStyle.inputField}
                    name="birthdate"
                    aria-label="birthdate"
                />

                <label
                    className={pageStyle.inputLabel}
                    htmlFor="country"
                >
                    Country
                </label>
                <DropdownMenu
                    responsive={false}
                    dropdownEntries={[
                        {
                            value: "United States",
                        },
                        { value: "Brazil" },
                        {
                            value: "Germany",
                        },
                        {
                            value: "Japan",
                        },
                    ]}
                    buttonProps={{ className: pageStyle.inputField }}
                    itemProps={{ className: pageStyle.inputField }}
                    listProps={{ className: pageStyle.inputField }}
                    // name="country"
                    // aria-label="country"
                />

                <label
                    className={pageStyle.inputLabel}
                    htmlFor="language"
                >
                    Language
                </label>
                <DropdownMenu
                    responsive={false}
                    dropdownEntries={[
                        {
                            value: "English (US)",
                        },
                        { value: "Portuguese (BR)" },
                        {
                            value: "German",
                        },
                        {
                            value: "Japanese",
                        },
                    ]}
                    // buttonProps={{ style: { width: "255px" } }}
                    // itemProps={{ style: { width: "255px" } }}
                    // listProps={{ style: { width: "255px" } }}
                    buttonProps={{ className: pageStyle.inputField }}
                    itemProps={{ className: pageStyle.inputField }}
                    listProps={{ className: pageStyle.inputField }}
                    // className={pageStyle.inputField}
                    // name="country"
                    // aria-label="country"
                />

                <label
                    className={pageStyle.inputLabel}
                    htmlFor="gender"
                >
                    Gender
                </label>
                <RadioGroup groupName="gender">
                    <RadioButton
                        labelProps={{
                            style: {
                                fontSize: "var(--font-size-lg)",
                            },
                        }}
                        label="Male"
                        value="Male"
                    />
                    <RadioButton
                        label="Female"
                        value="Female"
                    />
                    <RadioButton
                        label="Unspecified"
                        value="Unspecified"
                    />
                </RadioGroup>
            </div>
            <Button className={pageStyle.saveBtn}>Save changes</Button>
        </div>
    );
}
