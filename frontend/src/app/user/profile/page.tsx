import Button from "@/components/Button/button";
import RadioButton from "@/components/RadioButton/radioButton";

export default function Profile() {
    return (
        <div style={{ backgroundColor: "red" }}>
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
                <Button aria-label="Get country" />
            </div>
        </div>
    );
}
