import React from "react";
import GradientNavbar from "@/features/navigation/components/Sidebar/GradientNavbar";
import layoutStyle from "./layoutStyle.module.css";

export default function RootLayout({
    children,
}: {
    children: Readonly<React.ReactNode>;
}) {
    return (
        <div className={layoutStyle.layoutWrapper}>
            <aside className={layoutStyle.sidebarWrapper}>
                <GradientNavbar />
            </aside>
            <section className={layoutStyle.contentWrapper}>{children}</section>
        </div>
    );
}
