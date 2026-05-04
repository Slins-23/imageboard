import { registry } from "../../../../../openapi/registry.ts";
import { GetUserContract } from "./contract.ts";

registry.registerPath({
    method: GetUserContract.method.toLowerCase() as any,
    path: GetUserContract.path,
    request: {
        params: GetUserContract.request.params.schema,
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
