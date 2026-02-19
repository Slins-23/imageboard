"use client";
import {
    useEffect,
    createContext,
    useContext,
    useId,
    useRef,
    useState,
    ReactElement,
    isValidElement,
    cloneElement,
    type MouseEvent as ReactMouseEvent,
    type KeyboardEvent as ReactKeyboardEvent,
    type ReactNode,
    ButtonHTMLAttributes,
} from "react";
import { useControllableState } from "@/utils/utils";
import modalStyle from "./modal.module.css";
import Button from "@/components/Button/button";
import { createPortal } from "react-dom";

const ModalContext = createContext<
    | {
          internalIsOpen: boolean | undefined;
          setInternalIsOpen: (isOpen: boolean) => void;
          internalIsDismissible: boolean | undefined;
          setInternalIsDismissible: (isDismissible: boolean) => void;
      }
    | undefined
>(undefined);

export function useModalContext() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error(
            "Error: Could not use modal context from modal wrapper."
        );
    }

    return context;
}

interface RootArgs {
    isOpen?: boolean;
    defaultIsOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    onOpen?: () => void;
    onClose?: () => void;
    isDismissible?: boolean;
    defaultIsDismissible?: boolean;
    onDismissibleChange?: (isDismissible: boolean) => void;
    children?: ReactNode;
}

export function Root({
    isOpen = undefined,
    defaultIsOpen = false,
    onOpenChange = undefined,
    onOpen = undefined,
    onClose = undefined,
    isDismissible = undefined,
    defaultIsDismissible = true,
    onDismissibleChange = undefined,
    children,
}: RootArgs) {
    const [internalIsOpen, setInternalIsOpen] = useControllableState<boolean>({
        value: isOpen,
        defaultValue: defaultIsOpen,
        onChange: onOpenChange,
    });

    const [internalIsDismissible, setInternalIsDismissible] =
        useControllableState<boolean>({
            value: isDismissible,
            defaultValue: defaultIsDismissible,
            onChange: onDismissibleChange,
        });

    const modalId = useId();

    const previousIsOpen = useRef<boolean | undefined>(null);

    useEffect(() => {
        if (previousIsOpen.current === undefined) {
            previousIsOpen.current = internalIsOpen;
            return;
        }

        if (internalIsOpen === true && previousIsOpen.current === false) {
            onOpen?.();
        }

        if (internalIsOpen === false && previousIsOpen.current === true) {
            onClose?.();
        }

        previousIsOpen.current = internalIsOpen;
    }, [internalIsOpen, onOpen, onClose]);

    return (
        <div
            aria-modal="true"
            role="dialog"
            aria-label={modalId}
        >
            <ModalContext.Provider
                value={{
                    internalIsOpen,
                    setInternalIsOpen,
                    internalIsDismissible,
                    setInternalIsDismissible,
                }}
            >
                {children}
            </ModalContext.Provider>
        </div>
    );
}

export function Trigger({
    value,
    asChild,
    children,
    buttonProps,
}: {
    value: boolean;
    asChild?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children?: ReactElement<any>;
    buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}) {
    const { setInternalIsOpen } = useModalContext();

    const isDisabled =
        buttonProps !== undefined &&
        ("disabled" in buttonProps || "aria-label" in buttonProps)
            ? buttonProps.disabled || buttonProps["aria-disabled"]
            : // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (children?.props as any)?.disabled ||
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (children?.props as any)?.["aria-disabled"];

    const onClick =
        buttonProps !== undefined && buttonProps.onClick !== undefined
            ? buttonProps.onClick
            : // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (children?.props as any)?.onClick;

    const onKeyDown =
        buttonProps !== undefined && buttonProps.onKeyDown !== undefined
            ? buttonProps.onKeyDown
            : // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (children?.props as any)?.onKeyDown;

    const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
        if (isDisabled) return;

        onClick?.(event);

        if (event.defaultPrevented) return;

        setInternalIsOpen(value);
    };

    const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
        if (isDisabled) return;

        onKeyDown?.(event);

        // eslint-disable-next-line no-useless-return
        if (event.defaultPrevented) return;
    };

    if (
        asChild &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        isValidElement<{ onClick?: any; onKeyDown?: any }>(children)
    ) {
        return cloneElement(children, {
            onClick: handleClick,
            onKeyDown: handleKeyDown,
        });
    }

    return (
        <Button
            aria-label={value ? "Open" : "Close"}
            {...buttonProps}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {children}
        </Button>
    );
}

interface ModalOverlayArgs {
    children?: ReactNode;
    backgroundColor?: string;
    backgroundBlurRadius?: string;
    backgroundBlurOpacity?: string;
}

function ModalOverlay({
    children,
    backgroundColor = "var(--secondary)",
    backgroundBlurRadius = "var(--background-blur-radius)",
    backgroundBlurOpacity = "var(--background-blur-opacity)",
    ...args
}: ModalOverlayArgs) {
    const { internalIsOpen } = useModalContext();

    useEffect(() => {
        document.documentElement.style.overflow = internalIsOpen
            ? "hidden"
            : "visible";
    }, [internalIsOpen]);

    return (
        <div
            className={modalStyle.modal}
            style={{
                backgroundColor: `rgb(
        from ${backgroundColor} r g b / ${backgroundBlurOpacity}
    )`,
                backdropFilter: `blur(${backgroundBlurRadius})`,
                opacity: internalIsOpen ? "1" : "0",
                pointerEvents: internalIsOpen ? "initial" : "none",
                transitionDuration: internalIsOpen ? "1s" : "0.5s",
                overflow: internalIsOpen ? "hidden" : "visible",
            }}
            {...args}
        >
            <div
                className={`${modalStyle.wrapper}`}
                style={{ pointerEvents: internalIsOpen ? "initial" : "none" }}
            >
                {children}
            </div>
        </div>
    );
}

export function Content({ children, ...args }: ModalOverlayArgs) {
    const { internalIsOpen, internalIsDismissible, setInternalIsOpen } =
        useModalContext();

    const overlayWrapperRef = useRef<HTMLDivElement>(null);

    const modalId = useId();

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        const bodyElements = [...document.body.children];

        for (const element of bodyElements) {
            if (element.id === modalId) continue;

            if (internalIsOpen) {
                element.setAttribute("inert", "");
            } else {
                element.removeAttribute("inert");
            }
        }

        return () => {
            for (const element of bodyElements) {
                element.removeAttribute("inert");
            }
        };
    }, [internalIsOpen]);

    useEffect(() => {
        if (!internalIsOpen || overlayWrapperRef.current === undefined)
            return undefined;

        const focusableElements =
            overlayWrapperRef.current?.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

        if (focusableElements === undefined) return undefined;

        const firstElement = focusableElements[0];
        // eslint-disable-next-line unicorn/prefer-at
        const lastElement = focusableElements[focusableElements.length - 1];

        function handleKeyDown(event: KeyboardEvent) {
            if (
                event.code !== "Tab" &&
                event.code !== "ArrowUp" &&
                event.code !== "ArrowDown" &&
                event.code !== "ArrowLeft" &&
                event.code !== "ArrowRight" &&
                event.code !== "Escape"
            )
                return;

            if (event.code === "Escape") {
                if (internalIsDismissible) setInternalIsOpen(false);
                return;
            }

            if (document.activeElement === lastElement) {
                firstElement.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        firstElement.focus();

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [internalIsOpen, internalIsDismissible]);

    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return undefined;

    return createPortal(
        <div
            id={modalId}
            ref={overlayWrapperRef}
        >
            <ModalOverlay {...args}>{children}</ModalOverlay>
        </div>,
        document.body
    );
}
