import cardStyle from "./card.module.css";

interface CardParams {
    interestTag?: string;
    interestValue?: number;
}

export default function Card({
    interestTag = "Anime",
    interestValue = 0.95,
}: CardParams) {
    return (
        <div className={`${cardStyle.card}`}>
            {interestTag !== undefined && (
                <span className={`${cardStyle["interest-tag"]}`}>
                    {interestTag}
                </span>
            )}

            {interestValue !== undefined && (
                <span className={`${cardStyle["interest-value"]}`}>
                    {interestValue}
                </span>
            )}
        </div>
    );
}
