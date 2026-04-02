import Image from "next/image";
import styles from "./page.module.css";
import { DropdownMenu } from "@/components/DropdownMenu/dropdownMenu";
import Link from "next/link";
import Checkbox from "@/components/Checkbox/checkbox";
import IconButton from "@/components/IconButton/iconButton";
import { faRefresh, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    return (
        <div>
            <div
                style={{
                    marginLeft: "20px",
                }}
            ></div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    marginTop: "60px",
                }}
            >
                <div style={{ textAlign: "center", marginTop: "60px" }}>
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
                btnIcon={faRefresh}
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
