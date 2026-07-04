import toastStyle from "./toast.module.css";

export default function Toast(text = "This is a toast!", duration?: number) {
    const fadeDuration = 600; // How long until the popup fades out
    const dwellTimeMS = 2000; // "Base" wait time independent of the estimated reading time
    const avgWordsPerMinute = 200; // Assumption on how many words per minute are read, used for inferring a proportional display time
    let dismissed: boolean = false;

    if (duration === undefined) {
        const wordCount = text.split(" ").length;

        const avgWordsPerMS = avgWordsPerMinute / 60 / 1000;
        const readingTimeMS = wordCount / avgWordsPerMS;

        duration = readingTimeMS + dwellTimeMS;
    }

    const tooltipElement = document.createElement("div");
    tooltipElement.className = toastStyle.toast;
    tooltipElement.style.transitionDuration = `${fadeDuration}ms, ${fadeDuration}ms`;
    tooltipElement.textContent = text;

    const dismiss = () => {
        if (dismissed) return;

        dismissed = true;

        tooltipElement.classList.remove(toastStyle.visible);

        setTimeout(() => tooltipElement.remove(), fadeDuration);
    };

    tooltipElement.addEventListener("click", dismiss);

    document.body.append(tooltipElement);

    // This is a workaround for the element not fading in, only fading out
    // Element DOM appending and class are being batched into the same render
    // This line forces the browser to calculate the initial style prior to assigning the classname
    // eslint-disable-next-line no-void
    void tooltipElement.offsetHeight;

    requestAnimationFrame(() =>
        tooltipElement.classList.add(toastStyle.visible)
    );

    setTimeout(dismiss, duration);
}
