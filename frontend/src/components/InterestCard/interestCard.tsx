import Card from "@/components/Card/card";
import interestCardStyle from "./interestCard.module.css";
import { ComponentProps } from "react";

type CardParams = ComponentProps<typeof Card>;

interface InterestCardParams extends CardParams {
    interestTag?: string;
    interestValue?: number;
}

export default function InterestCard({
    interestTag = "Anime",
    interestValue = 0.95,
    ...args
}: InterestCardParams) {
    return (
        <Card
            style={{ width: "150px", height: "150px " }}
            {...args}
        >
            <div className={`${interestCardStyle.wrapper}`}>
                {interestTag && (
                    <span className={`${interestCardStyle["interest-tag"]}`}>
                        {interestTag}
                    </span>
                )}
                {interestValue && (
                    <span
                        className={`${interestCardStyle["interest-value"]}`}
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
