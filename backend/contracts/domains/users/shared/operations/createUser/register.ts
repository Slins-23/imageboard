import { registry } from "../../../../../openapi/registry.ts";
import { CreateUserContract } from "./contract.ts";

registry.registerPath({
    method: CreateUserContract.method.toLowerCase() as any,
    path: CreateUserContract.path,
    request: {
        body: {
            content: {
                "application/json": {
                    schema: CreateUserContract.request.body.content[
                        "application/json"
                    ].schema,
                },
            },
        },
    },
    responses: Object.fromEntries(
        Object.entries(CreateUserContract.responses).map(([status, schema]) => [
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
