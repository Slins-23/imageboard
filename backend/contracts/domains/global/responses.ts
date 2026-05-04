import z from "zod";

// 400
export const BadRequest: z.ZodObject = z.object({
    message: z.literal("Invalid input."),
});

// 404
export const NotFound: z.ZodObject = z.object({
    message: z.literal("Data not found."),
});

// 500
export const InternalError: z.ZodObject = z.object({
    message: z.literal("Internal error."),
});
