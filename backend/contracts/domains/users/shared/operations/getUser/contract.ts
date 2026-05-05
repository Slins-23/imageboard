import { z } from "zod";
import { UserRecord } from "../../schemas.ts";
import { BadRequest, InternalError } from "../../../../global/responses.ts";
import { GetUserParams } from "./schemas.ts";

export const GetUserContract = {
    method: "GET",
    path: "/api/users/{column}/{value}",

    request: {
        params: {
            schema: GetUserParams,
        },
    },

    responses: {
        200: z.object({ user: UserRecord }),
        400: BadRequest,
        404: z.object({
            message: z.literal("User not found."),
        }),
        500: InternalError,
    },
} as const;
