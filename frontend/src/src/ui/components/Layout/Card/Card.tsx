import cardStyle from "./Card.module.css";
import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface CardParams extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}

export default function Card({ children = undefined, ...props }: CardParams) {
    return (
        <div
            {...props}
            className={clsx(cardStyle.card, props.className)}
        >
            {children}
        </div>
    );
}
