"use client";

import BaseButton, {
    type IconButtonProps,
} from "@/ui/components/Buttons/IconButton/IconButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LinkButton({
    route,
    parentRoute,
    ...props
}: IconButtonProps & {
    route: string;
    parentRoute?: string;
}) {
    const pathname = usePathname();

    return (
        <BaseButton
            as={Link}
            href={route}
            isActive={
                parentRoute
                    ? pathname.includes(parentRoute)
                    : route === pathname
            }
            {...props}
        ></BaseButton>
    );
}
