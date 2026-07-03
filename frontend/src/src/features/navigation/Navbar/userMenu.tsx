import BaseMenu from "@/ui/components/UserMenu/userMenu";
import { NavigationItem } from "@/ui/types/navigation";
import { usePathname, useRouter } from "next/navigation";

export default function UserMenu() {
    const slug = usePathname();
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
            currentRoute={slug}
            onItemSelected={(item) => router.push(item.route)}
        />
    );
}
