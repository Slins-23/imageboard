import Card from "@/components/Card/card";
import type { ReactNode } from "react";

export default function SignupDialog({ children }: { children?: ReactNode }) {
    return (
        <Card
            style={{
                width: "472px",
                height: "455px",
                border: "0",
                borderRadius: "10px",
                boxShadow: "0 0 26.4px 8px var(--secondary)",
                backgroundImage:
                    "linear-gradient(var(--primary) 0%, var(--primary) 22%, var(--secondary) 100%)",
            }}
        >
            {children}
        </Card>
    );
}
