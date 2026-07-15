"use client";

import { type ReactNode, type InputEvent } from "react";
import Button from "@/ui/components/Buttons/Button/Button";
import DialogCard from "@/ui/components/Layout/DialogCard/DialogCard";
import themePickerStyle from "./ThemePicker.module.css";

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

export default function ThemePicker(): ReactNode {
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
            <div className={themePickerStyle.wrapper}>
                <div className={themePickerStyle.colorRow}>
                    <label htmlFor="colorPrimary">Primary: </label>
                    <input
                        className={themePickerStyle.colorOption}
                        type="color"
                        defaultValue={defaultPrimary}
                        onInput={(event: InputEvent<HTMLInputElement>) =>
                            updateVarFromPicker(event, "primary")
                        }
                    />
                </div>

                <div className={themePickerStyle.colorRow}>
                    <label htmlFor="colorSecondary">Secondary: </label>
                    <input
                        className={themePickerStyle.colorOption}
                        type="color"
                        defaultValue={defaultSecondary}
                        onInput={(event: InputEvent<HTMLInputElement>) =>
                            updateVarFromPicker(event, "secondary")
                        }
                    />
                </div>
                <div className={themePickerStyle.colorRow}>
                    <label htmlFor="colorTertiary">Tertiary: </label>
                    <input
                        className={themePickerStyle.colorOption}
                        type="color"
                        defaultValue={defaultTertiary}
                        onInput={(event: InputEvent<HTMLInputElement>) =>
                            updateVarFromPicker(event, "tertiary")
                        }
                    />
                </div>
                <div className={themePickerStyle.colorRow}>
                    <label htmlFor="colorAccent">Accent: </label>
                    <input
                        className={themePickerStyle.colorOption}
                        type="color"
                        defaultValue={defaultAccent}
                        onInput={(event: InputEvent<HTMLInputElement>) =>
                            updateVarFromPicker(event, "accent")
                        }
                    />
                </div>
            </div>
            <div className={themePickerStyle.buttons}>
                <Button onClick={saveColors}>Save</Button>
                <Button onClick={cancelColors}>Cancel</Button>
                <Button onClick={resetColors}>Reset</Button>
            </div>
        </DialogCard>
    );
}
