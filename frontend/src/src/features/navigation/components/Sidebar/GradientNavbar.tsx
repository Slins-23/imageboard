"use client";

import BaseNavbar from "@/ui/components/Navigation/GradientNavbar/GradientNavbar";
import { NavigationItem } from "@/ui/types/navigation";
import { usePathname, useRouter } from "next/navigation";

export default function GradientNavbar() {
    const pathname = usePathname();
    const router = useRouter();

    const sidebarTitle = "Account";
    const sidebarItems: NavigationItem[] = [
        { route: "/user/settings/profile", text: "Profile" },
        { route: "/user/settings/credentials", text: "Credentials" },
        { route: "/user/settings/interests", text: "Interests" },
        { route: "/user/settings/history", text: "History" },
        { route: "/user/settings/linked-accounts", text: "Linked accounts" },
        { route: "/user/settings/notifications", text: "Notifications" },
        { route: "/user/settings/delete", text: "Delete" },
    ];

    return (
        <BaseNavbar
            title={sidebarTitle}
            items={sidebarItems}
            currentRoute={pathname}
            onItemSelected={(item) => router.push(item.route)}
        />
    );
}
