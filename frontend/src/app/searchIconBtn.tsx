"use client";

import CreatePost from "@/components/CreatePost/createPost";
import { usePathname } from "next/navigation";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@/components/IconButton/iconButton";

export default function SearchIconBtn() {
    const pathname = usePathname();
    const subPaths = pathname.split("/");
    const searchableRoutes = ["", "/", "tags", "albums", "users"];

    if (subPaths.length === 1) {
        return (
            <center>
                <IconButton
                    btnIcon={faSearch}
                    width="50px"
                    height="50px"
                    iconSize="25px"
                />
            </center>
        );
    } else {
        if (searchableRoutes.includes(subPaths[1])) {
            return (
                <IconButton
                    style={{ marginLeft: "60px" }}
                    btnIcon={faSearch}
                    width="50px"
                    height="50px"
                    iconSize="25px"
                />
            );
        } else {
            return null;
        }
    }
}
