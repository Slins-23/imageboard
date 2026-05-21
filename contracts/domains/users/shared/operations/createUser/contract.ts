import { z } from "zod";
import { BadRequest, InternalError } from "../../../../global/responses.ts";
import { CreateUserInput } from "./schemas.ts";

export const CreateUserContract = {
    method: "POST",
    path: "/api/users/create",

    request: {
        body: {
            content: {
                "application/json": {
                    schema: CreateUserInput,
                },
            },
        },
    },

    responses: {
        201: z.object({ message: z.literal("User successfully created.") }),
        400: BadRequest,
        404: z.object({
            message: z.literal("Invalid endpoint."),
        }),
        500: InternalError,
    },
} as const;
