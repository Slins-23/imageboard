import { z } from "zod";
import { User } from "../../schemas.ts";

export const GetUserParams = z.discriminatedUnion("column", [
    z.object({
        column: z.literal("id"),
        value: User.shape.id,
    }),
    z.object({
        column: z.literal("username"),
        value: User.shape.username,
    }),
    z.object({
        column: z.literal("email"),
        value: User.shape.email,
    }),
]);

export type GetUserParams = z.infer<typeof GetUserParams>;
