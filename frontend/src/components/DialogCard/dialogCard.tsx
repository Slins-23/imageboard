import Card from "@/components/Card/card";
import dialogStyle from "./dialogCard.module.css";
import { ComponentProps } from "react";

type CardProps = ComponentProps<typeof Card>;

export default function DialogCard({ ...args }: CardProps) {
    return (
        <Card
            {...args}
            style={{
                borderRadius: "10px",
                ...args.style,
            }}
        >
            <div className={dialogStyle.wrapper}>{args.children}</div>
        </Card>
    );
}
