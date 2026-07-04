import Card from "@/ui/components/Layout/Card/Card";
import interestCardStyle from "./InterestCard.module.css";
import { ComponentProps } from "react";

type CardParams = ComponentProps<typeof Card>;

interface InterestCardParams extends CardParams {
    interestTag?: string;
    interestValue?: number;
}

export default function InterestCard({
    interestTag = "Anime",
    interestValue = 0.95,
    ...props
}: InterestCardParams) {
    return (
        <Card
            {...props}
            style={{ width: "150px", height: "150px ", ...props.style }}
        >
            <div className={interestCardStyle.wrapper}>
                {interestTag && (
                    <span className={interestCardStyle["interest-tag"]}>
                        {interestTag}
                    </span>
                )}
                {interestValue && (
                    <span
                        className={interestCardStyle["interest-value"]}
                        style={{
                            fontSize: `0.75em`,
                        }}
                    >
                        {interestValue}
                    </span>
                )}
            </div>
        </Card>
    );
}
