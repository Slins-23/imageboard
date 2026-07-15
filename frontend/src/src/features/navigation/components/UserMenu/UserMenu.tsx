import BaseMenu from "@/ui/components/Navigation/UserMenu/UserMenu";
import { NavigationItem } from "@/ui/types/navigation";
import { usePathname, useRouter } from "next/navigation";

export default function UserMenu() {
    const pathname = usePathname();
    const router = useRouter();

    const isSignedIn = true;

    const signedOutItems: NavigationItem[] = [
        {
            route: "/user/signin",
            text: "Sign in",
        },
        {
            route: "/user/signup",
            text: "Sign up",
        },
    ];

    const signedInItems: NavigationItem[] = [
        {
            route: "/user/profile",
            text: "My profile",
        },
        {
            route: "/user/likes",
            text: "My likes",
        },
        {
            route: "/user/albums",
            text: "My albums",
        },
        {
            route: "/user/signout",
            text: "Sign out",
        },
    ];

    return (
        <BaseMenu
            navProps={{
                style: {
                    // position: "absolute",
                    // right: 0,
                },
            }}
            items={isSignedIn ? signedInItems : signedOutItems}
            currentRoute={pathname}
            onItemSelected={(item) => router.push(item.route)}
        />
    );
}
