import BaseNavbar from "@/ui/components/GradientNavbar/gradientNavbar";
import { NavigationItem } from "@/ui/types/navigation";
import { usePathname, useRouter } from "next/navigation";

export default function GradientNavbar() {
    const slug = usePathname();
    const router = useRouter();

    const items: NavigationItem[] = [
        {
            route: "/",
            text: "Home",
        },
    ];

    return (
        <BaseNavbar
            title="Account"
            items={items}
            currentRoute={slug}
            onItemSelected={(item) => router.push(item.route)}
        />
    );
}
