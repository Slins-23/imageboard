import cardStyle from "./card.module.css";
import type { HTMLAttributes, ReactNode } from "react";

interface CardParams extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}

export default function Card({ children = undefined, ...args }: CardParams) {
    return (
        <div
            className={`${cardStyle.card}`}
            {...args}
        >
            {children}
        </div>
    );
}
