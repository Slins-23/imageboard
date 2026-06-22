import React from "react";
import GradientNavbar, {
    NavigationItem,
} from "@/components/GradientNavbar/gradientNavbar";
import layoutStyle from "./layoutStyle.module.css";

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

export default function RootLayout({
    children,
}: {
    children: Readonly<React.ReactNode>;
}) {
    return (
        <div className={layoutStyle.layoutWrapper}>
            <aside className={layoutStyle.sidebarWrapper}>
                <GradientNavbar
                    title={sidebarTitle}
                    items={sidebarItems}
                />
            </aside>
            <section className={layoutStyle.contentWrapper}>{children}</section>
        </div>
    );
}
