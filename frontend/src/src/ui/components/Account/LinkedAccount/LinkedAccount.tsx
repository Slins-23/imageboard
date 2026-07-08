"use client";

import linkedAccountStyle from "./LinkedAccount.module.css";
import useControllableState from "@/ui/hooks/useControllableState";
import { filledElementFromSVG } from "@/ui/utils/svg";

import {
    useRef,
    type MouseEvent,
    type KeyboardEvent,
    useLayoutEffect,
    type ComponentPropsWithoutRef,
    type Dispatch,
    type SetStateAction,
} from "react";

interface LinkedAccountProps extends ComponentPropsWithoutRef<"div"> {
    iconSrc?: string;
    iconAlt?: string;
    width?: string;
    height?: string;
    isConnected?: boolean;
    defaultIsConnected?: boolean;
    onDisconnected?: (isConnected?: boolean) => void;
    onConnected?: (isConnected?: boolean) => void;
    onConnectedChange?: Dispatch<SetStateAction<boolean>>;
    wrapperWidth?: string;
}

export default function LinkedAccount({
    iconSrc = "social-media/google.svg",
    width = "75px",
    height = "75px",
    isConnected,
    defaultIsConnected = false,
    onDisconnected,
    onConnected,
    onConnectedChange,
    wrapperWidth = "900px",
    ...props
}: LinkedAccountProps) {
    const [internalIsConnected, setInternalIsConnected] =
        useControllableState<boolean>({
            value: isConnected,
            defaultValue: defaultIsConnected,
            onChange: onConnectedChange,
        });

    const connectedEmail: string = "username@gmail.com";

    const iconWrapperRef = useRef<HTMLDivElement | null>(null);

    const linkAccount = (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ) => {
        setInternalIsConnected(true);
        onConnected?.(true);
    };

    const unlinkAccount = (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ) => {
        setInternalIsConnected(false);
        onDisconnected?.(false);
    };

    const svgResolved = useRef(false);

    useLayoutEffect(() => {
        if (svgResolved.current) return;

        const resolveSVG = async () => {
            if (iconWrapperRef.current === null) return;

            const svgElement = await filledElementFromSVG(
                iconSrc,
                width,
                height
            );

            if (svgElement !== undefined) {
                iconWrapperRef.current.replaceChildren(svgElement);
                svgResolved.current = true;
            }
        };

        resolveSVG();
    }, []);

    return (
        <div
            className={linkedAccountStyle.wrapper}
            {...props}
            style={{
                width: wrapperWidth,
                ...props.style,
            }}
        >
            <div ref={iconWrapperRef}></div>
            <div className={linkedAccountStyle.container}>
                {internalIsConnected && (
                    <span className={linkedAccountStyle.text}>
                        Connected as{" "}
                        <span style={{ color: "var(--tertiary)" }}>
                            {connectedEmail}
                        </span>
                    </span>
                )}

                {internalIsConnected ? (
                    <button
                        className={linkedAccountStyle.button}
                        onClick={unlinkAccount}
                    >
                        Disconnect
                    </button>
                ) : (
                    <button
                        className={linkedAccountStyle.button}
                        onClick={linkAccount}
                    >
                        Connect
                    </button>
                )}
            </div>
        </div>
    );
}
