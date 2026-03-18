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
    type HTMLAttributes,
    ComponentProps,
    RefObject,
} from "react";
import { useControllableState } from "@/utils/utils";
import modalStyle from "./modal.module.css";
import Button from "@/components/Button/button";
import { createPortal } from "react-dom";

const ModalContext = createContext<
    | {
          internalIsOpen: boolean | undefined;
          setInternalIsOpen: (isOpen: boolean) => void;
          internalIsDismissible: RefObject<boolean | undefined>;
          fadeDuration: number;
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

interface RootArgs extends HTMLAttributes<HTMLDivElement> {
    isOpen?: boolean;
    defaultIsOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    onOpen?: () => void;
    onClose?: () => void;
    isDismissible?: RefObject<boolean | undefined>;
    defaultIsDismissible?: boolean;
    fadeDuration?: number;
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
    fadeDuration = 500,
    children,
    ...args
}: RootArgs) {
    const [internalIsOpen, setInternalIsOpen] = useControllableState<boolean>({
        value: isOpen,
        defaultValue: defaultIsOpen,
        onChange: onOpenChange,
    });

    const internalIsDismissible = isDismissible ?? useRef(defaultIsDismissible);

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
            {...args}
        >
            <ModalContext.Provider
                value={{
                    internalIsOpen,
                    setInternalIsOpen,
                    internalIsDismissible,
                    fadeDuration,
                }}
            >
                {children}
            </ModalContext.Provider>
        </div>
    );
}

interface TriggerArgs extends ComponentProps<typeof Button> {
    triggerValue: boolean;
    asChild?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children?: ReactElement<typeof Button>;
}

export function Trigger({
    triggerValue,
    asChild,
    children,
    ...args
}: TriggerArgs) {
    const { setInternalIsOpen } = useModalContext();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childrenProps: any | undefined = children?.props;

    const isDisabled = Boolean(
        args.disabled ||
        args["aria-disabled"] ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        childrenProps?.disabled ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        childrenProps?.["aria-disabled"]
    );

    const onClick = args.onClick || childrenProps?.onClick;

    const onKeyDown = args.onKeyDown || childrenProps?.onKeyDown;

    const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
        if (isDisabled) return;

        onClick?.(event);

        if (event.defaultPrevented) return;

        setInternalIsOpen(triggerValue);
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
            aria-label={triggerValue ? "Open" : "Close"}
            {...args}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {triggerValue ? "Open" : "Close"}
            {children}
        </Button>
    );
}

interface ModalOverlayArgs extends HTMLAttributes<HTMLDivElement> {
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
    contentWrapperRef,
    ...args
}: ModalOverlayArgs & { contentWrapperRef: RefObject<HTMLDivElement | null> }) {
    const { internalIsOpen, fadeDuration } = useModalContext();

    useEffect(() => {
        document.documentElement.style.overflow = internalIsOpen
            ? "hidden"
            : "visible";
    }, [internalIsOpen]);

    return (
        <div
            className={modalStyle.modal}
            data-state={internalIsOpen ? "open" : "closed"}
            {...args}
            style={{
                backgroundColor: `rgb(
        from ${backgroundColor} r g b / ${backgroundBlurOpacity}
    )`,
                backdropFilter: `blur(${backgroundBlurRadius})`,
                ...args.style,
                transitionDuration: `${fadeDuration}ms`,
            }}
        >
            <div
                ref={contentWrapperRef}
                className={modalStyle.wrapper}
            >
                {children}
            </div>
        </div>
    );
}

export function Content({ children, ...args }: ModalOverlayArgs) {
    const {
        internalIsOpen,
        internalIsDismissible,
        setInternalIsOpen,
        fadeDuration,
    } = useModalContext();

    const overlayWrapperRef = useRef<HTMLDivElement | null>(null);
    const contentWrapperRef = useRef<HTMLDivElement | null>(null);

    const modalId = useId();

    const [isMounted, setIsMounted] = useState<boolean>(false);

    const [resetKey, setResetKey] = useState(0);

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
        if (!internalIsOpen) {
            setTimeout(
                () => setResetKey((prevResetKey) => prevResetKey + 1),
                fadeDuration
            );
            return undefined;
        }

        if (overlayWrapperRef.current === undefined) return undefined;

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
                if (internalIsDismissible.current) setInternalIsOpen(false);
                return;
            }

            if (
                event.code === "Tab" &&
                document.activeElement === lastElement
            ) {
                event.preventDefault();
                firstElement?.focus();
            } else if (
                event.shiftKey &&
                event.code === "Tab" &&
                document.activeElement === firstElement
            ) {
                event.preventDefault();
                lastElement?.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        if (firstElement?.tagName !== "BUTTON") firstElement?.focus();

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [internalIsOpen]);

    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return undefined;

    function dismiss(event: ReactMouseEvent<HTMLDivElement>) {
        if (contentWrapperRef.current === null) return;

        if (internalIsDismissible.current) {
            if ((event.target as Node) === contentWrapperRef.current) {
                setInternalIsOpen(false);
            }
        }
    }

    return createPortal(
        <div
            id={modalId}
            ref={overlayWrapperRef}
            onClick={dismiss}
        >
            <ModalOverlay
                {...args}
                contentWrapperRef={contentWrapperRef}
            >
                <div key={resetKey}>{children}</div>
            </ModalOverlay>
        </div>,
        document.body
    );
}
