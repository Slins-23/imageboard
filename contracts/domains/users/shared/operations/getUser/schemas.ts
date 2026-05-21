import { z } from "zod";
import { User } from "../../schemas.ts";

export enum Column {
    id = "id",
    username = "username",
    email = "email",
}

export const GetUserParams = z.discriminatedUnion("column", [
    z.object({
        column: z.literal(Column.id),
        value: User.shape.id,
    }),
    z.object({
        column: z.literal(Column.username),
        value: User.shape.username,
    }),
    z.object({
        column: z.literal(Column.email),
        value: User.shape.email,
    }),
]);

export const GetUserParamsOpenAPI = z.object({
    column: z.enum(Column),
});

export type GetUserParams = z.infer<typeof GetUserParams>;

export type GetUserParamsOpenAPI = z.infer<typeof GetUserParamsOpenAPI>;
