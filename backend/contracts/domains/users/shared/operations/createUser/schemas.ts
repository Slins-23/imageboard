import { z } from "zod";
import { UserBase } from "../../base.ts";
import { PasswordPlain } from "../../primitives.ts";

export const CreateUserInput = UserBase.extend({
    password: PasswordPlain,
});

export type CreateUserInput = z.infer<typeof CreateUserInput>;
