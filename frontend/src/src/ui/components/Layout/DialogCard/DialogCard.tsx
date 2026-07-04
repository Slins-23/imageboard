import Card from "@/ui/components/Layout/Card/Card";
import dialogStyle from "./DialogCard.module.css";
import { ComponentProps, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type CardProps = ComponentProps<typeof Card>;

interface DialogCardArgs extends CardProps {
    children?: ReactNode;
    cardProps?: CardProps;
    wrapperArgs?: HTMLAttributes<HTMLDivElement>;
}

export default function DialogCard({
    children,
    cardProps,
    wrapperArgs,
}: DialogCardArgs) {
    return (
        <Card
            {...cardProps}
            className={clsx(dialogStyle.card, cardProps?.className)}
        >
            <div
                {...wrapperArgs}
                className={clsx(dialogStyle.wrapper, wrapperArgs?.className)}
            >
                {children}
            </div>
        </Card>
    );
}
