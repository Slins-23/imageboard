import cardStyle from "./Card.module.css";
import type { ReactNode, ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

interface CardParams extends ComponentPropsWithoutRef<"div"> {
    children?: ReactNode;
}

export default function Card({ children, ...props }: CardParams) {
    return (
        <div
            {...props}
            className={clsx(cardStyle.card, props.className)}
        >
            {children}
        </div>
    );
}
