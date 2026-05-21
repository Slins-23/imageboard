import { registry } from "../../../../../openapi/registry.ts";
import { GetUserContract } from "./contract.ts";
import { GetUserParamsOpenAPI } from "./schemas.ts";

registry.registerPath({
    method: GetUserContract.method.toLowerCase() as "get",
    path: GetUserContract.path,
    request: {
        params: GetUserParamsOpenAPI,
    },
    responses: Object.fromEntries(
        Object.entries(GetUserContract.responses).map(([status, schema]) => [
            status,
            {
                description: `Response ${status}`,
                content: {
                    "application/json": {
                        schema,
                    },
                },
            },
        ])
    ),
});
