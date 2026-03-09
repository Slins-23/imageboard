import { useControllableState } from "@/utils/utils";
import Button from "@/components/Button/button";
import type { Stage, StageComponentArgs } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import loadingStyle from "./loading.module.css";
import { useEffect, useRef, useState } from "react";

export default function Loading({
    defaultStage = "Loading",
    currentStage = undefined,
    onStageChange = undefined,
}: StageComponentArgs) {
    const mainWrapperRef = useRef<HTMLDivElement | null>(null);

    const [internalCurrentStage, setInternalCurrentStage] =
        useControllableState<Stage>({
            defaultValue: defaultStage,
            value: currentStage,
            onChange: onStageChange,
        });

    // const [isVisible, setIsVisible] = useState(false);

    /*
    useEffect(() => {
        requestAnimationFrame(() => {
            if (mainWrapperRef.current === null) return;

            mainWrapperRef.current.style.opacity = "1";
        });
    }, [internalCurrentStage]);
    */

    return (
        <div
            ref={mainWrapperRef}
            style={{
                opacity: "1",
                transitionProperty: "opacity",
                transitionDuration: "3s",
            }}
        >
            <FontAwesomeIcon
                icon={faCircleNotch}
                className={loadingStyle.icon}
            ></FontAwesomeIcon>
        </div>
    );
}
