import cardStyle from "./card.module.css";
import { type HTMLAttributes, type ReactNode } from "react";

interface CardParams extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    interestTag?: string;
    interestValue?: number;
    width?: string;
    height?: string;
    fontSize?: string;
}

export default function Card({
    children = undefined,
    interestTag = "Anime",
    interestValue = 0.95,
    width = "150px",
    height = "150px",
    fontSize = "2rem",
    ...args
}: CardParams) {
    return (
        <div
            className={`${cardStyle.card}`}
            style={{ width, height }}
            {...args}
        >
            {children ?? (
                <>
                    {interestTag && (
                        <span
                            className={`${cardStyle["interest-tag"]}`}
                            style={{ fontSize }}
                        >
                            {interestTag}
                        </span>
                    )}

                    {interestValue !== undefined && (
                        <span
                            className={`${cardStyle["interest-value"]}`}
                            style={{
                                fontSize: `${Number.parseFloat(fontSize) * 0.75}rem`,
                            }}
                        >
                            {interestValue}
                        </span>
                    )}
                </>
            )}
        </div>
    );
}
