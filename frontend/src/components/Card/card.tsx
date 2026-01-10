import cardStyle from "./card.module.css";

interface CardParams {
    interestTag?: string;
    interestValue?: number;
    width?: string;
    height?: string;
    fontSize?: string;
}

export default function Card({
    interestTag = "Anime",
    interestValue = 0.95,
    width = "150px",
    height = "150px",
    fontSize = "2rem",
}: CardParams) {
    return (
        <div
            className={`${cardStyle.card}`}
            style={{ width, height }}
        >
            {interestTag !== undefined && (
                <span
                    className={`${cardStyle["interest-tag"]}`}
                    style={{ fontSize }}
                >
                    {interestTag}
                </span>
            )}

            {interestValue !== undefined && (
                <span
                    className={`${cardStyle["interest-value"]}`}
                    style={{
                        fontSize: `${Number.parseFloat(fontSize) * 0.75}rem`,
                    }}
                >
                    {interestValue}
                </span>
            )}
        </div>
    );
}
