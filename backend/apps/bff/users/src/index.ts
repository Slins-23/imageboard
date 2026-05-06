import express, {
    type Request,
    type Response,
    type NextFunction,
} from "express";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import { z } from "zod";
import { Agent, type IncomingMessage } from "http";
import cors from "cors";
import { GetUserParams } from "@app/contracts/domains/users/shared/operations/getUser/schemas.ts";
import { CreateUserInput } from "@app/contracts/domains/users/shared/operations/createUser/schemas.ts";

const app = express();

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
    });
});

const validate =
    (schema: z.ZodType, source: "body" | "params" | "query") =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[source]);

        if (!result.success) {
            console.log("Error: Invalid data.");
            return res.status(400).json({
                message: "Error: Invalid data.",
            });
        }

        next();
    };

const keepAliveAgent = new Agent({
    keepAlive: true,
    keepAliveMsecs: 1000,
    maxSockets: 2000,
    maxFreeSockets: 256,
    timeout: 60000,
});

const usersAuthDBProxy = createProxyMiddleware({
    target: "http://db-users-auth:80",
    agent: keepAliveAgent,
    changeOrigin: true,
    on: {
        proxyReq: fixRequestBody,
        proxyRes: (proxyRes: IncomingMessage, req: Request, res: Response) => {
            console.log(`(BFF) Forwarding request to 'db-users-auth' API`);
        },
    },
});

app.use(express.json());

app.use(
    cors({
        origin: ["http://swagger.localhost:8080"],
    })
);

app.get("/api/users/all", usersAuthDBProxy);

app.get(
    "/api/users/:column/:value",
    validate(GetUserParams, "params"),
    usersAuthDBProxy
);

app.post(
    "/api/users/create",
    validate(CreateUserInput, "body"),
    usersAuthDBProxy
);

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});
