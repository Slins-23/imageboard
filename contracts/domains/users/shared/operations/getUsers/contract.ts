import { z } from "zod";
import { UserRecord } from "../../schemas.ts";
import { BadRequest, InternalError } from "../../../../global/responses.ts";

export const GetUsersContract = {
    method: "GET",
    path: "/api/users/all",

    responses: {
        200: z.object({ users: z.array(UserRecord) }),
        400: BadRequest,
        404: z.object({
            message: z.literal("No user found."),
        }),
        500: InternalError,
    },
} as const;
