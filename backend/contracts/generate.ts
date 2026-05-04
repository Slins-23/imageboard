import { OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./openapi/registry.ts";
import "./registerRoutes.ts";

const generator = new OpenApiGeneratorV31(registry.definitions);
const doc = generator.generateDocument({
    openapi: "3.1.0",
    info: {
        title: "API",
        version: "1.0.0",
    },
});

console.log(JSON.stringify(doc, null, 2));
