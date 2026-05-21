import { z } from "zod";
import { Username, Email } from "./primitives.ts";

export const UserBase = z.object({
    username: Username,
    email: Email,
});

export type UserBase = z.infer<typeof UserBase>;
