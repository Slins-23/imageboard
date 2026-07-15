import Checkbox from "@/ui/components/Input/Checkbox/Checkbox";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    return (
        <div style={{ flexGrow: 1 }}>
            <div
                style={{
                    marginLeft: "20px",
                }}
            ></div>
            <div
                style={{
                    display: "flex",
                    flexGrow: 1,
                    flexDirection: "column",
                    gap: "20px",
                    marginTop: "60px",
                }}
            >
                <div
                    style={{
                        lineHeight: 1.5,
                        alignSelf: "center",
                        justifySelf: "center",
                        textAlign: "center",
                        marginTop: "60px",
                    }}
                >
                    <span style={{ fontSize: "var(--font-size-lg)" }}>
                        Display tags, filters, and preferences
                    </span>
                    <Checkbox
                        style={{ marginLeft: "10px" }}
                        iconSize="calc((var(--font-size-md) + var(--font-size-lg)) / 2)"
                    />
                </div>
            </div>
            <IconButton
                icon={faRefresh}
                style={{
                    position: "fixed",
                    left: "10px",
                    bottom: "10px",
                    // zIndex: "9999999999999999999",
                }}
            />
        </div>
    );
}
