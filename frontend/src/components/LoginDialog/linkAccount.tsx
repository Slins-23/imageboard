import Button from "@/components/Button/button";
import {
    type ComponentProps,
    CSSProperties,
    useLayoutEffect,
    useRef,
} from "react";
import { filledElementFromSVG } from "@/utils/utils";
import linkAccountStyle from "./linkAccount.module.css";

interface LinkAccountArgs extends ComponentProps<typeof Button> {
    src?: string;
    name?: string;
    iconWidth?: string;
    iconHeight?: string;
}

export default function LinkAccount({
    src = "social-media/google.svg",
    name = "Google",
    iconWidth = "2rem",
    iconHeight = "2rem",
    ...args
}: LinkAccountArgs) {
    const iconWrapperRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const resolveSVG = async () => {
            if (iconWrapperRef.current === null) return;

            const svgElement = await filledElementFromSVG(
                src,
                iconWidth,
                iconHeight
            );

            if (svgElement !== undefined) {
                iconWrapperRef.current.append(svgElement);
            }
        };

        resolveSVG();
    }, []);

    return (
        <Button
            {...args}
            style={
                {
                    "--bg-color-hover": "var(--primary)",
                    "--text-color-hover": "var(--tertiary)",
                    width: "300px",
                    borderRadius: "10px",
                    fontSize: "var(--font-size-xl)",
                    padding: "0.3em 0.9em",
                } as CSSProperties
            }
        >
            <div className={linkAccountStyle.contentWrapper}>
                <div ref={iconWrapperRef}></div>
                <span>with {name}</span>
            </div>
        </Button>
    );
}
