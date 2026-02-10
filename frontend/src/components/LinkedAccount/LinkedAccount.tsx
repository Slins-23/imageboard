import linkedAccountStyle from "./LinkedAccount.module.css";
import { useControllableState } from "@/utils/utils";
import {
    useRef,
    type MouseEvent,
    type KeyboardEvent,
    useLayoutEffect,
} from "react";

interface LinkedAccountArgs {
    iconSrc?: string;
    iconAlt?: string;
    width?: string;
    height?: string;
    isConnected?: boolean;
    defaultIsConnected?: boolean;
    onDisconnected?: (isConnected?: boolean) => void;
    onConnected?: (isConnected?: boolean) => void;
    onConnectedChange?: (isConnected?: boolean) => void;
    wrapperWidth: string;
}

export default function LinkedAccount({
    iconSrc = "google.svg",
    width = "80px",
    height = "80px",
    isConnected = undefined,
    defaultIsConnected = false,
    onDisconnected = undefined,
    onConnected = undefined,
    onConnectedChange = undefined,
    wrapperWidth = "900px",
}: LinkedAccountArgs) {
    const [internalIsConnected, setInternalIsConnected] =
        useControllableState<boolean>({
            value: isConnected,
            defaultValue: defaultIsConnected,
            onChange: onConnectedChange,
        });

    const connectedEmail: string = "username@gmail.com";

    const iconWrapperRef = useRef<HTMLDivElement | null>(null);

    const linkAccount = (
        event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ) => {
        setInternalIsConnected(true);
        onConnected?.(true);
    };

    const unlinkAccount = (
        event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ) => {
        setInternalIsConnected(false);
        onDisconnected?.(false);
    };

    useLayoutEffect(() => {
        if (iconWrapperRef.current !== null) {
            fetch(iconSrc)
                .then((res) => res.text())
                .then((svg) => {
                    if (iconWrapperRef.current === null) return;
                    iconWrapperRef.current.innerHTML = svg;

                    const svgElement = iconWrapperRef.current
                        .children[0] as SVGElement;

                    const strokes = svgElement.querySelectorAll("path");

                    for (const stroke of strokes) {
                        stroke.style.fill = "var(--tertiary)";
                    }

                    svgElement.style.width = width;
                    svgElement.style.height = height;
                });
        }
    }, []);

    return (
        <div
            className={`${linkedAccountStyle.wrapper}`}
            style={{
                width: wrapperWidth,
            }}
        >
            <div ref={iconWrapperRef}></div>

            {/* <object
                data="facebook.svg"
                type="image/svg+xml"
                width="70"
                height="70"
                aria-label="hi"
                style={{ backgroundColor: "none", fill: "red" }}
            >
                <img
                    src="facebook.svg"
                    alt="facebook"
                ></img>
            </object> */}
            <div className={`${linkedAccountStyle.container}`}>
                {internalIsConnected && (
                    <span className={`${linkedAccountStyle.text}`}>
                        Connected as{" "}
                        <span style={{ color: "var(--tertiary)" }}>
                            {connectedEmail}
                        </span>
                    </span>
                )}

                {internalIsConnected ? (
                    <button
                        className={`${linkedAccountStyle.button}`}
                        onClick={unlinkAccount}
                    >
                        Disconnect
                    </button>
                ) : (
                    <button
                        className={`${linkedAccountStyle.button}`}
                        onClick={linkAccount}
                    >
                        Connect
                    </button>
                )}
            </div>
        </div>
    );
}
