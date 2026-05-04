import { Pool, type QueryResult } from "pg";
import express, {
    type NextFunction,
    type Request,
    type Response,
} from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import { v7 as uuidv7 } from "uuid";
import { GetUserParams } from "@app/contracts/domains/users/shared/operations/getUser/schemas.ts";
import { CreateUserInput } from "@app/contracts/domains/users/shared/operations/createUser/schemas.ts";

type ResultGetUser =
    | { type: "success"; data: QueryResult }
    | { type: "not_found" }
    | { type: "invalid_input" }
    | { type: "error"; error: unknown };

type ResultCreateUser =
    | { type: "success" }
    | { type: "username_too_long" }
    | { type: "email_too_long" }
    | { type: "password_too_long" }
    | { type: "hashing_error"; error: unknown }
    | { type: "error"; error: unknown };

const validate =
    (schema: z.ZodType, source: "body" | "query" | "params") =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[source]);

        if (!result.success) {
            const issue = result.error.issues[0] as z.core.$ZodIssue;

            if (issue.path[0] && issue.code) {
                return res.status(400).json({
                    message: `(Zod) Path: ${issue.path} - Code: ${issue.code}`,
                });
            }

            console.log("Invalid input.");
            return res.status(400).json({
                message: "Invalid input.",
            });
        }

        next();
    };

const pgPool = new Pool({
    host: "postgresql-db-users-auth.databases.svc.cluster.local",
    database: "users_auth",
    user: "admin",
    password: "12345",
    port: 5432,
});

const app = express();

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "ok",
    });
});

app.use(express.json());

app.get("/api/users/all", async (req: Request, res: Response) => {
    try {
        const pgResponse = await pgPool.query(`SELECT * FROM users_auth`);

        console.log("Successfully got all users.");

        return res.status(200).json({
            users: pgResponse.rows,
        });
    } catch (err: any) {
        console.error(`Error: ${err.stack}`);

        return res.status(500).json({
            message: `Error: ${err.stack}`,
        });
    }
});

async function getUser(
    column: "id" | "username" | "email",
    value: string
): Promise<ResultGetUser> {
    try {
        const pgResponse = await pgPool.query(
            `SELECT * FROM users_auth WHERE ${column} = $1`,
            [value]
        );

        if (pgResponse.rows.length === 0) {
            console.log(
                `No user found by column '${column}' with value '${value}'`
            );
            return { type: "not_found" };
        }

        console.log(
            `Successfully found user by column '${column}' with value '${value}'`
        );

        return { type: "success", data: pgResponse };
    } catch (err: unknown) {
        console.error(err);
        return { type: "error", error: err };
    }
}

app.get(
    "/api/users/:column/:value",
    validate(GetUserParams, "params"),
    async (req: Request<GetUserParams>, res) => {
        const { column, value } = req.params;

        console.log(`Getting user by column '${column}' with value '${value}'`);

        const result = await getUser(column, value);

        switch (result.type) {
            case "success":
                return res.status(200).json({
                    user: result.data.rows[0],
                });

            case "invalid_input":
                return res.status(400).json({
                    message: "Invalid input.",
                });

            case "not_found":
                return res.status(404).json({
                    message: "User not found.",
                });

            case "error":
                return res.status(500).json({
                    message: "Error",
                });
        }
    }
);

async function createUser(
    username: string,
    password: string,
    email: string
): Promise<ResultCreateUser> {
    let hashedPassword: string;

    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err: unknown) {
        console.error(`Error: Could not hash password ${err}`);
        return { type: "hashing_error", error: err };
    }

    try {
        const pgResponse = await pgPool.query(
            `INSERT INTO users_auth (id, username, password, email) VALUES ($1, $2, $3, $4);`,
            [uuidv7(), username, hashedPassword, email]
        );

        console.log("Successfully created user");
        return { type: "success" };
    } catch (err: unknown) {
        console.error(`Error: Could not create user`);
        return { type: "error", error: err };
    }
}

app.post(
    "/api/users/create",
    validate(CreateUserInput, "body"),
    async (req, res) => {
        const { username, password, email } = req.body;

        console.log(`(db-users-auth): Received user post data`);

        const result: ResultCreateUser = await createUser(
            username,
            password,
            email
        );

        switch (result.type) {
            case "success":
                return res.status(201).json({
                    message: "User successfully created.",
                });
            case "username_too_long":
                return res.status(400).json({
                    message:
                        "Error: Username is too long (Max. 15 characters).",
                });
            case "email_too_long":
                return res.status(400).json({
                    message: "Error: Email is too long (Max. 254 characters).",
                });
            case "password_too_long":
                return res.status(400).json({
                    message: "Error: Password is too long (Max 72 characters).",
                });
            case "hashing_error":
                return res.status(500).json({
                    message: "Error: Could not hash the password.",
                });
            case "error":
                return res.status(500).json({
                    error: `Error: ${result.error}`,
                });
        }
    }
);

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});
