import Card from "@/components/Card/card";
import type { ReactNode, ComponentProps } from "react";

interface SignupDialogArgs extends ComponentProps<typeof Card> {
    children?: ReactNode;
}

export default function SignupDialog({ children, ...args }: SignupDialogArgs) {
    return (
        <Card
            {...args}
            style={{
                width: "472px",
                height: "455px",
                border: "0",
                borderRadius: "10px",
                boxShadow: "0 0 26.4px 8px var(--secondary)",
                backgroundImage:
                    "linear-gradient(var(--primary) 0%, var(--primary) 22%, var(--secondary) 100%)",
                ...args.style,
            }}
        >
            {children}
        </Card>
    );
}
