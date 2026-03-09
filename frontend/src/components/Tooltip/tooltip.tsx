import { useLayoutEffect, useRef, useState } from "react";
import tooltipStyle from "./tooltip.module.css";
import { delayUntilRuntimeStage } from "next/dist/server/app-render/dynamic-rendering";
import { createPortal } from "react-dom";

export default function Tooltip(
    text = "This is a tooltip!",
    duration?: number
) {
    if (duration === undefined) {
        const wordCount = text.split(" ").length;
        const avgWordsPerMinute = 200;
        const avgWordsPerMS = avgWordsPerMinute / 60 / 1000;
        const readingTimeMS = wordCount / avgWordsPerMS;

        const dwellTimeMS = 2000;

        duration = readingTimeMS + dwellTimeMS;
    }

    const fadeDuration = 600;

    const tooltipElement = document.createElement("div");
    tooltipElement.className = tooltipStyle.tooltip;
    tooltipElement.style.transitionDuration = `${fadeDuration}ms, ${fadeDuration}ms`;
    tooltipElement.textContent = text;

    const dismiss = () => {
        tooltipElement.classList.remove(tooltipStyle.visible);

        setTimeout(() => tooltipElement.remove(), fadeDuration);
    };

    tooltipElement.onclick = dismiss;

    document.body.appendChild(tooltipElement);

    // This is a workaround for the element not fading in, only fading out
    // Element DOM appending and class are being batched into the same render
    // This line forces the browser to calculate the initial style prior to assigning the classname
    void tooltipElement.offsetHeight;

    requestAnimationFrame(() =>
        tooltipElement.classList.add(tooltipStyle.visible)
    );

    setTimeout(dismiss, duration);
}
