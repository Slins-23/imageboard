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
    type Dispatch,
    type SetStateAction,
    ComponentProps,
    RefObject,
    ComponentPropsWithoutRef,
} from "react";
import useControllableState from "@/ui/hooks/useControllableState";
import modalStyle from "./modal.module.css";
import Button from "@/ui/components/Buttons/Button/Button";
import { createPortal } from "react-dom";

const ModalContext = createContext<
    | {
          internalIsOpen: boolean | undefined;
          setInternalIsOpen: Dispatch<SetStateAction<boolean>>;
          internalIsDismissible: RefObject<boolean>;
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

interface RootProps extends ComponentPropsWithoutRef<"div"> {
    isOpen?: boolean;
    defaultIsOpen?: boolean;
    onOpenChange?: Dispatch<SetStateAction<boolean>>;
    onOpen?: () => void;
    onClose?: () => void;
    isDismissible?: RefObject<boolean>;
    defaultIsDismissible?: boolean;
    fadeDuration?: number;
    children?: ReactNode;
}

function Root({
    isOpen,
    defaultIsOpen = false,
    onOpenChange,
    onOpen,
    onClose,
    isDismissible,
    defaultIsDismissible = true,
    fadeDuration = 500,
    children,
    ...props
}: RootProps) {
    const [internalIsOpen, setInternalIsOpen] = useControllableState<boolean>({
        value: isOpen,
        defaultValue: defaultIsOpen,
        onChange: onOpenChange,
    });

    const internalIsDismissible = isDismissible ?? useRef(defaultIsDismissible);

    const modalId = useId();

    const previousIsOpen = useRef<boolean | null>(null);

    useEffect(() => {
        if (previousIsOpen.current === null) {
            previousIsOpen.current = internalIsOpen;
            return;
        }

        if (internalIsOpen && !previousIsOpen.current) {
            onOpen?.();
        }

        if (!internalIsOpen && previousIsOpen.current) {
            onClose?.();
        }

        previousIsOpen.current = internalIsOpen;
    }, [internalIsOpen, onOpen, onClose]);

    return (
        <div
            aria-modal="true"
            role="dialog"
            aria-label={modalId}
            {...props}
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

interface TriggerProps extends ComponentProps<typeof Button> {
    triggerValue: boolean;
    asChild?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children?: ReactElement;
}

function Trigger({ triggerValue, asChild, children, ...props }: TriggerProps) {
    const { setInternalIsOpen } = useModalContext();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childrenProps: any | undefined = children?.props;

    const isDisabled = Boolean(
        props.disabled ||
        props["aria-disabled"] ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        childrenProps?.disabled ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        childrenProps?.["aria-disabled"]
    );

    const onClick = props.onClick || childrenProps?.onClick;

    const onKeyDown = props.onKeyDown || childrenProps?.onKeyDown;

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
            {...props}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {triggerValue ? "Open" : "Close"}
            {children}
        </Button>
    );
}

interface ModalOverlayProps extends ComponentPropsWithoutRef<"div"> {
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
    ...props
}: ModalOverlayProps & {
    contentWrapperRef: RefObject<HTMLDivElement | null>;
}) {
    const { internalIsOpen, fadeDuration } = useModalContext();

    /*
    useEffect(() => {
        document.documentElement.style.overflow = internalIsOpen
            ? "hidden"
            : "visible";
    }, [internalIsOpen]);
    */

    /*
    useEffect(() => {
        // Calculate the physical width of the user's scrollbar
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        if (internalIsOpen) {
            document.documentElement.style.overflow = "hidden";
            // Add padding equal to the scrollbar to prevent the layout shift
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            // Revert styles when modal closes
            document.documentElement.style.overflow = "";
            document.body.style.paddingRight = "";
        }
    }, [internalIsOpen]);
    */

    return (
        <div
            className={modalStyle.modal}
            data-state={internalIsOpen ? "open" : "closed"}
            {...props}
            style={{
                backgroundColor: `rgb(
        from ${backgroundColor} r g b / ${backgroundBlurOpacity}
    )`,
                backdropFilter: `blur(${backgroundBlurRadius})`,
                ...props.style,
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

function Content({ children, ...props }: ModalOverlayProps) {
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
            setTimeout(() => {
                setResetKey((prevResetKey) => prevResetKey + 1);
            }, fadeDuration);
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
                event.key !== "Tab" &&
                event.key !== "ArrowUp" &&
                event.key !== "ArrowDown" &&
                event.key !== "ArrowLeft" &&
                event.key !== "ArrowRight" &&
                event.key !== "Escape"
            )
                return;

            if (event.key === "Escape") {
                if (internalIsDismissible.current) setInternalIsOpen(false);
                return;
            }

            if (event.key === "Tab" && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement?.focus();
            } else if (
                event.shiftKey &&
                event.key === "Tab" &&
                document.activeElement === firstElement
            ) {
                event.preventDefault();
                lastElement?.focus();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        // if (firstElement?.tagName !== "BUTTON") firstElement?.focus();
        firstElement?.focus();

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [internalIsOpen]);

    useEffect(() => setIsMounted(true), []);

    if (!isMounted) return undefined;

    function dismiss(event: ReactMouseEvent<HTMLDivElement>) {
        if (contentWrapperRef.current === null) return;

        if (
            internalIsDismissible.current &&
            (event.target as Node) === contentWrapperRef.current
        ) {
            setInternalIsOpen(false);
        }
    }

    return createPortal(
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
            id={modalId}
            ref={overlayWrapperRef}
            onClick={dismiss}
        >
            <ModalOverlay
                {...props}
                contentWrapperRef={contentWrapperRef}
            >
                <div key={resetKey}>{children}</div>
            </ModalOverlay>
        </div>,
        document.body
    );
}

export { Root, Trigger, Content };
