import { registry } from "../../../../../openapi/registry.ts";
import { GetUsersContract } from "./contract.ts";

registry.registerPath({
    method: GetUsersContract.method.toLowerCase() as "get",
    path: GetUsersContract.path,
    responses: Object.fromEntries(
        Object.entries(GetUsersContract.responses).map(([status, schema]) => [
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
