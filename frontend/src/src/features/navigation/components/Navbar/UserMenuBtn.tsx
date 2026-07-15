"use client";

import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import UserMenu from "@/features/navigation/components/UserMenu/UserMenu";
import { useEffect, useRef, useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function UserMenuBtn() {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isUserMenuOpen) return;

        const callback = (event: PointerEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", callback);

        return () => {
            document.removeEventListener("pointerdown", callback);
        };
    }, [isUserMenuOpen]);

    return (
        <div
            ref={wrapperRef}
            style={{ position: "relative" }}
        >
            <IconButton
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                icon={faUser}
                width="50px"
                height="50px"
                iconSize="25px"
            />
            {isUserMenuOpen && <UserMenu />}
        </div>
    );
}
