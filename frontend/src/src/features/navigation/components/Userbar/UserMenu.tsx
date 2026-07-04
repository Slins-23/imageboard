import BaseMenu from "@/ui/components/Navigation/UserMenu/UserMenu";
import { NavigationItem } from "@/ui/types/navigation";
import { usePathname, useRouter } from "next/navigation";

export default function UserMenu() {
    const pathname = usePathname();
    const router = useRouter();

    const items: NavigationItem[] = [
        {
            route: "/",
            text: "Home",
        },
    ];

    return (
        <BaseMenu
            items={items}
            currentRoute={pathname}
            onItemSelected={(item) => router.push(item.route)}
        />
    );
}
