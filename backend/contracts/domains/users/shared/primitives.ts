import { z } from "zod";

export const UUID = z.uuidv7();
export const Username = z.string().min(2).max(15);
export const PasswordPlain = z.string().min(8).max(72);
export const PasswordHash = z.string().length(60);
export const Email = z.email().max(254);

export type Username = z.infer<typeof Username>;
export type UUID = z.infer<typeof UUID>;
export type Email = z.infer<typeof Email>;
