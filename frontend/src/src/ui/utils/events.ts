import { type MouseEvent, type KeyboardEvent } from "react";

export function isMouseEvent(
    event: MouseEvent | KeyboardEvent
): event is MouseEvent {
    return event.type === "click";
}
