"use client";

import { type ReactNode, type InputEvent } from "react";
import Button from "@/components/Button/button";
import DialogCard from "@/components/DialogCard/dialogCard";

function getColor(name: string): string {
    const rootStyle = window.getComputedStyle(document.documentElement);
    const color = rootStyle.getPropertyValue(`--${name}`);

    return color;
}

function updateVarFromColor(name: string, color: string): void {
    document.documentElement.style.setProperty(`--${name}`, color);
}

function updateVarFromPicker(
    event: InputEvent<HTMLInputElement>,
    name: string
): void {
    const newColor = event.currentTarget.value;

    updateVarFromColor(name, newColor);
}

function saveColors() {}

function resetColors() {
    updateVarFromColor("primary", "#0d1c37");
    updateVarFromColor("secondary", "#122a53");
    updateVarFromColor("tertiary", "#73a5f8");
    updateVarFromColor("accent", "#acc4ee");
}

export default function ThemePicker({
    children,
}: {
    children?: ReactNode;
}): ReactNode {
    const defaultPrimary = getColor("primary");
    const defaultSecondary = getColor("secondary");
    const defaultTertiary = getColor("tertiary");
    const defaultAccent = getColor("accent");

    // const primary = defaultPrimary;
    // const secondary = defaultSecondary;
    // const tertiary = defaultTertiary;
    // const accent = defaultAccent;

    const cancelColors = () => {
        updateVarFromColor("primary", defaultPrimary);
        updateVarFromColor("secondary", defaultSecondary);
        updateVarFromColor("tertiary", defaultTertiary);
        updateVarFromColor("accent", defaultAccent);
    };

    return (
        <DialogCard>
            <h3>Theme</h3>
            <div
                className="themeRow"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    textAlign: "left",
                }}
            >
                <div style={{ width: "100%" }}>
                    <label htmlFor="colorPrimary">Primary: </label>
                    <input
                        style={{
                            float: "right",
                            border: "none",
                            borderRadius: "5px",
                            outlineStyle: "solid",
                            outlineColor: "var(--tertiary)",
                            outlineWidth: "2px",
                        }}
                        type="color"
                        id="colorPrimary"
                        defaultValue={defaultPrimary}
                        onInput={(event: InputEvent<HTMLInputElement>) =>
                            updateVarFromPicker(event, "primary")
                        }
                    />
                </div>

                <div style={{ width: "100%" }}>
                    <label htmlFor="colorSecondary">Secondary: </label>
                    <input
                        style={{
                            float: "right",
                            border: "none",
                            borderRadius: "5px",
                            outlineStyle: "solid",
                            outlineColor: "var(--tertiary)",
                            outlineWidth: "2px",
                        }}
                        type="color"
                        id="colorSecondary"
                        defaultValue={defaultSecondary}
                        onInput={(event: InputEvent<HTMLInputElement>) =>
                            updateVarFromPicker(event, "secondary")
                        }
                    />
                </div>
                <div style={{ width: "100%" }}>
                    <label htmlFor="colorTertiary">Tertiary: </label>
                    <input
                        style={{
                            float: "right",
                            border: "none",
                            borderRadius: "5px",
                            outlineStyle: "solid",
                            outlineColor: "var(--tertiary)",
                            outlineWidth: "2px",
                        }}
                        type="color"
                        id="colorTertiary"
                        defaultValue={defaultTertiary}
                        onInput={(event: InputEvent<HTMLInputElement>) =>
                            updateVarFromPicker(event, "tertiary")
                        }
                    />
                </div>
                <div style={{ width: "100%" }}>
                    <label htmlFor="colorAccent">Accent: </label>
                    <input
                        style={{
                            float: "right",
                            border: "none",
                            borderRadius: "5px",
                            outlineStyle: "solid",
                            outlineColor: "var(--tertiary)",
                            outlineWidth: "2px",
                        }}
                        type="color"
                        id="colorAccent"
                        defaultValue={defaultAccent}
                        onInput={(event: InputEvent<HTMLInputElement>) =>
                            updateVarFromPicker(event, "accent")
                        }
                    />
                </div>
            </div>
            <div
                className="optionsRow"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                }}
            >
                <Button onClick={saveColors}>Save</Button>
                <Button onClick={cancelColors}>Cancel</Button>
                <Button onClick={resetColors}>Reset</Button>
            </div>
        </DialogCard>
    );
}
