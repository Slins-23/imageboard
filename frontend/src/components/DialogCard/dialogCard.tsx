import Card from "@/components/Card/card";
import dialogStyle from "./dialogCard.module.css";
import { ComponentProps, HTMLAttributes, ReactNode } from "react";

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
            style={{
                // width: "fit-content",
                // height: "fit-content",
                backgroundColor: "var(--primary)",
                borderRadius: "10px",
                boxShadow: "0px 0px 66.5px 26px var(--secondary)",
                ...cardProps?.style,
            }}
        >
            <div
                className={dialogStyle.wrapper}
                {...wrapperArgs}
            >
                {children}
            </div>
        </Card>
    );
}
