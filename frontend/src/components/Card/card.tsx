import cardStyle from "./card.module.css";

interface CardParams {
    interestTag: string;
    interestValue: number;
}

export default function Card({
    interestTag = "Anime",
    interestValue = 0.95,
}: CardParams) {
    console.log(cardStyle);

    return (
        <div className={`${cardStyle.card}`}>
            <span className={`${cardStyle["interest-tag"]}`}>
                {interestTag}
            </span>
            <span className={`${cardStyle["interest-value"]}`}>
                {interestValue}
            </span>
        </div>
    );
}
