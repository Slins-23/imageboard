"use client";

import { usePathname } from "next/navigation";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@/ui/components/Buttons/IconButton/IconButton";

export default function SearchIconBtn() {
    const pathname = usePathname();
    // const subPaths = pathname.split("/");
    // const searchableRoutes = ["", "/", "tags", "albums", "users"];
    const nonSearchableRoutes = ["/user/settings"];

    let routeIsNonSearchable: boolean = false;

    for (const route of nonSearchableRoutes) {
        if (pathname.includes(route)) {
            routeIsNonSearchable = true;

            break;
        }
    }

    return routeIsNonSearchable ? null : (
        <center>
            <IconButton
                style={{
                    marginLeft: "60px",
                }}
                icon={faSearch}
                width="50px"
                height="50px"
                iconSize="25px"
            />
        </center>
    );
}
