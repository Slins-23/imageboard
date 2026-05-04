import { z } from "zod";

export const GetUserParams = z.object({
    column: z.enum(["id", "username", "email"]),
    value: z.string().max(254),
});

export type GetUserParams = z.infer<typeof GetUserParams>;
