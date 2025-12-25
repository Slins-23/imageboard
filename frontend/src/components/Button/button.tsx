export interface ButtonArgs {
    backgroundColor: string;
    padding: number;
    borderRadius: number;
    color: string;
    fontSize: number;
    border: string;
    onClick?: () => void;
}

export default function button({
    backgroundColor = "blue",
    padding = 15,
    borderRadius = 15,
    color = "grey",
    fontSize = 16,
    border = "red solid 1px",
    ...properties
}: ButtonArgs) {
    return (
        <button
            type={"button"}
            style={{
                backgroundColor,
                padding,
                borderRadius,
                color,
                fontSize,
                border,
            }}
            {...properties}
        >
            Click
        </button>
    );
}
