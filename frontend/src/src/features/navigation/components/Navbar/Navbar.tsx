"use client";

import {
    faHouse,
    faTags,
    faGear,
    faMessage,
    faBell,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import CreatePostBtn from "./CreatePostBtn";
import SearchIconBtn from "./SearchIconBtn";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav
            style={{
                display: "flex",
                marginTop: "10px",
                marginLeft: "10px",
                marginRight: "10px",
                justifyContent: "space-between",
                flexDirection: "row",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                }}
            >
                <IconButton
                    as={Link}
                    href="/"
                    isActive={pathname === "/"}
                    icon={faHouse}
                    width="50px"
                    height="50px"
                    iconSize="25px"
                />
                <IconButton
                    as={Link}
                    href="/tags"
                    isActive={pathname === "/tags"}
                    icon={faTags}
                    width="50px"
                    height="50px"
                    iconSize="25px"
                />
                <IconButton
                    as={Link}
                    href="/user/settings/profile"
                    isActive={pathname.includes("/user/settings/")}
                    icon={faGear}
                    width="50px"
                    height="50px"
                    iconSize="25px"
                />
            </div>

            <SearchIconBtn />

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                }}
            >
                <CreatePostBtn />
                <IconButton
                    hasNotifications={true}
                    notificationProps={{
                        defaultCount: 32,
                    }}
                    icon={faMessage}
                    width="50px"
                    height="50px"
                    iconSize="25px"
                />
                <IconButton
                    hasNotifications={true}
                    notificationProps={{
                        defaultCount: 55,
                    }}
                    icon={faBell}
                    width="50px"
                    height="50px"
                    iconSize="25px"
                />
                <IconButton
                    icon={faUser}
                    width="50px"
                    height="50px"
                    iconSize="25px"
                />
            </div>
        </nav>
    );
}
