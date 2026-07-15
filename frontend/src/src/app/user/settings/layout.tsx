import React from "react";
import GradientNavbar from "@/features/navigation/components/Sidebar/GradientNavbar";
import layoutStyle from "./layout.module.css";
import clsx from "clsx";

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
            <section
                className={clsx(layoutStyle.contentWrapper, layoutStyle.vars)}
            >
                {children}
            </section>
        </div>
    );
}
