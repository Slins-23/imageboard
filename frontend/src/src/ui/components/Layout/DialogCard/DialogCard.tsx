import Card from "@/ui/components/Layout/Card/Card";
import dialogStyle from "./DialogCard.module.css";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";

type CardProps = ComponentPropsWithoutRef<typeof Card>;

interface DialogCardProps extends CardProps {
    children?: ReactNode;
    cardProps?: CardProps;
    wrapperArgs?: ComponentPropsWithoutRef<"div">;
}

export default function DialogCard({
    children,
    cardProps,
    wrapperArgs,
}: DialogCardProps) {
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
