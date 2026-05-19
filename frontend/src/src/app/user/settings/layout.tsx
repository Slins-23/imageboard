import React from "react";
import GradientNavbar, {
    NavigationItems,
} from "@/components/GradientNavbar/gradientNavbar";
import layoutStyle from "./layoutStyle.module.css";

const title = "Account";
const items: NavigationItems = [
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
        /*
        <div
            style={{
                position: "relative",
                alignItems: "stretch",
                height: "100%",
                // minHeight: "calc(100vh - 70px)",
                backgroundColor: "red",
                // alignItems: "stretch",
                display: "flex",
                flexDirection: "row",
                // height: "100%",
                marginTop: "5%",
                // alignItems: "center",
                // justifyContent: "center",
            }}
        >
            <div
                style={{
                    top: "17.5%",
                    position: "sticky",
                    alignSelf: "flex-start",
                }}
            >
                <GradientNavbar
                    title={title}
                    items={items}
                />
            </div>
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexGrow: "1",

                    // height: "100%",
                }}
            >
                <div
                    style={{
                        marginRight: "7.5%",
                        width: "70%",
                        height: "100%",
                        outlineStyle: "solid",
                        outlineWidth: "1px",
                        outlineColor: "var(--tertiary)",
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
        */
        <div className={layoutStyle.layoutWrapper}>
            <aside className={layoutStyle.sidebarWrapper}>
                <GradientNavbar
                    title={title}
                    items={items}
                />
            </aside>
            <section className={layoutStyle.contentWrapper}>{children}</section>
        </div>
    );
}
