export async function filledElementFromSVG(
    src: string,
    width?: string | number,
    height?: string | number
): Promise<SVGElement | undefined> {
    const response = await fetch(src);
    const svg = await response.text();

    const tmpContainer = document.createElement("div");
    tmpContainer.innerHTML = svg;

    const firstChild = tmpContainer.children[0];

    if (!(firstChild instanceof SVGSVGElement)) {
        return undefined;
    }

    const svgElement = firstChild as SVGElement;

    const strokes = svgElement.querySelectorAll("path");

    for (const stroke of strokes) {
        stroke.style.fill = "var(--tertiary)";
    }

    if (width !== undefined) svgElement.style.width = width.toString();
    if (height !== undefined) svgElement.style.height = height.toString();

    svgElement.style.display = "block";

    return svgElement;
}
