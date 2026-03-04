import Button from "@/components/Button/button";
import { type ComponentProps, useLayoutEffect, useRef } from "react";
import { filledElementFromSVG } from "@/utils/utils";

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
        <Button {...args}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "1.6rem",
                }}
            >
                <div ref={iconWrapperRef}></div>
                <span>with {name}</span>
            </div>
        </Button>
    );
}
