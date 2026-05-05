import express, {
    type Request,
    type Response,
    type NextFunction,
} from "express";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import { z } from "zod";
import { Agent, type IncomingMessage } from "http";
import cors from "cors";

const app = express();

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
    });
});

type SchemaSource = "body" | "params" | "query";

const GetUserSchema: z.ZodObject = z.object({
    column: z.enum(["id", "username", "email"]),
    value: z.string(),
});

const CreateUserSchema: z.ZodObject = z.object({
    username: z.string().min(2).max(15),
    email: z.email().max(254),
    password: z.string().min(8).max(72),
});

const validate =
    (schema: z.ZodType, source: SchemaSource) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req[source]);
            next();
        } catch (err: unknown) {
            console.log("Error: Invalid data.");
            return res.status(400).json({
                message: "Error: Invalid data.",
            });
        }
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
    validate(GetUserSchema, "params"),
    usersAuthDBProxy
);

app.post(
    "/api/users/create",
    validate(CreateUserSchema, "body"),
    usersAuthDBProxy
);

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});
