import Button from "@/ui/components/Buttons/Button/Button";
import { type ComponentProps, useLayoutEffect, useRef } from "react";
import { filledElementFromSVG } from "@/ui/utils/svg";
import linkAccountStyle from "./LinkAccount.module.css";

interface LinkAccountProps extends ComponentProps<typeof Button> {
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
    ...props
}: LinkAccountProps) {
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
            {...props}
            className={linkAccountStyle.linkBtn}
        >
            <div className={linkAccountStyle.contentWrapper}>
                <div ref={iconWrapperRef}></div>
                <span>with {name}</span>
            </div>
        </Button>
    );
}
