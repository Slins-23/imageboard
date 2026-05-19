"use client";

import {
    faHouse,
    faTags,
    faGear,
    faSearch,
    faMessage,
    faBell,
    faUser,
    faCircleHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import CreatePostBtn from "./createPostBtn";
import SearchIconBtn from "./searchIconBtn";
import IconButton from "@/components/IconButton/iconButton";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const pathname = usePathname();

    /*
    const [currentRoute, setCurrentRoute] = useState<string>(() =>
        // items.findIndex((item) => item.route === slug)
        "/"
    );
    */

    useEffect(() => {
        // setCurrentRouteIdx(items.findIndex((item) => item.route === slug));
    }, [pathname]);

    return (
        <nav
            style={{
                // top: 0,
                // left: 0,
                // zIndex: 999999999,
                // width: "100%",
                // position: "fixed",
                display: "flex",
                // gap: "10px",
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
                <Link href="/">
                    <IconButton
                        isActive={pathname === "/"}
                        btnIcon={faHouse}
                        width="50px"
                        height="50px"
                        iconSize="25px"
                    />
                </Link>
                <Link href="/tags">
                    <IconButton
                        isActive={pathname === "/tags"}
                        btnIcon={faTags}
                        width="50px"
                        height="50px"
                        iconSize="25px"
                    />
                </Link>
                <Link href="/user/settings/profile">
                    <IconButton
                        isActive={
                            pathname.indexOf("/user/settings/") === -1
                                ? false
                                : true
                        }
                        btnIcon={faGear}
                        width="50px"
                        height="50px"
                        iconSize="25px"
                    />
                </Link>
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
                    btnIcon={faMessage}
                    width="50px"
                    height="50px"
                    iconSize="25px"
                />
                <IconButton
                    hasNotifications={true}
                    notificationProps={{
                        defaultCount: 55,
                    }}
                    btnIcon={faBell}
                    width="50px"
                    height="50px"
                    iconSize="25px"
                />
                <IconButton
                    btnIcon={faUser}
                    width="50px"
                    height="50px"
                    iconSize="25px"
                />
            </div>
        </nav>
    );
}
