import { CSSProperties, ReactNode } from "react";
import postTagsStyle from "./postTags.module.css";
import Card from "@/components/Card/card";
import Button from "@/components/Button/button";
import Link from "next/link";
import { makeKebabCase } from "@/utils/utils";

interface PostTagsArgs {
    tags: string[];
    children?: ReactNode;
}

export default function PostTags({
    tags = [
        "Anime",
        "Rain",
        "City",
        "Mountains",
        "Character",
        "Melancholic",
        "Sky",
        "Night",
        "Stars",
        "Dawn",
        "Ethereal",
        "Dusk",
        "Nebula",
        "Female",
        "Short hair",
        "Staring",
        "Solitude",
        "Wanderlust",
        "Woman",
        "Skyscraper",
        "Girl",
        "Fiction",
    ],
    children = undefined,
}: PostTagsArgs) {
    return (
        <Card
            style={{
                display: "flex",
                width: "400px",
                height: "355px",
                flexDirection: "column",
                gap: "1.6875rem",
                alignItems: "center",
                backgroundColor:
                    "rgb(from var(--primary) r g b / var(--foreground-blur-opacity))",
                backdropFilter: "blur(var(--background-blur-radius))",
                padding: "1.75rem 0 1.75rem 1.75rem",
                borderRadius: "10px",
                boxShadow:
                    "0px 0px 66.5px 26px rgb(from var(--primary) r g b / var(--foreground-blur-opacity))",
                outlineStyle: "none",
            }}
        >
            <span
                style={{
                    fontSize: "var(--font-size-3xl)",
                    paddingRight: "1.75rem",
                }}
            >
                Tags
            </span>
            <ul className={postTagsStyle.tagsList}>
                {tags.map((tag: string) => (
                    <li key={tag}>
                        <Button
                            style={
                                {
                                    "--bg-color": "var(--secondary)",
                                    outlineWidth: "1.5px",
                                    outlineColor: "var(--tertiary)",
                                    outlineStyle: "solid",
                                    outlineOffset: "-1px",
                                    fontSize:
                                        "calc((var(--font-size-lg) + var(--font-size-md)) / 2 )",
                                    padding: "0.3125em 0.625em",
                                    overflow: "hidden",
                                    textWrap: "nowrap",
                                    whiteSpace: "nowrap",
                                    borderRadius: "10px",
                                } as CSSProperties
                            }
                        >
                            <Link href={`/tags/${makeKebabCase(tag)}`}>
                                {tag}
                            </Link>
                        </Button>
                    </li>
                ))}
            </ul>
        </Card>
    );
}
