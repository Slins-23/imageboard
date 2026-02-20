import React from "react";
import GradientNavbar, {
    NavigationItems,
} from "@/components/GradientNavbar/gradientNavbar";

const title = "Account";
const items: NavigationItems = [
    { route: "/user/profile", text: "Profile" },
    { route: "/user/credentials", text: "Credentials" },
    { route: "/user/interests", text: "Interests" },
    { route: "/user/history", text: "History" },
    { route: "/user/linked-accounts", text: "Linked accounts" },
    { route: "/user/notifications", text: "Notifications" },
    { route: "/user/delete", text: "Delete" },
];

export default function RootLayout({
    children,
}: {
    children: Readonly<React.ReactNode>;
}) {
    return (
        <div>
            <GradientNavbar
                title={title}
                items={items}
            />
            <div
                style={{
                    padding: "var(--font-size-lg)",
                    backgroundColor: "green",
                }}
            >
                {children}
            </div>
        </div>
    );
}
