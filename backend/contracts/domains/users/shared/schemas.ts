import { z } from "zod";
import { UUID, PasswordHash } from "./primitives.ts";
import { UserBase } from "./base.ts";

export const User = UserBase.extend({
    id: UUID.brand<"UserID">(),
});

export const UserRecord = User.extend({
    password: PasswordHash,
});

export type User = z.infer<typeof User>;

export type UserRecord = z.infer<typeof UserRecord>;
