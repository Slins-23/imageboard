import type { Config } from "jest";
import { createDefaultEsmPreset, TS_EXT_TO_TREAT_AS_ESM } from "ts-jest";

const tsJestTransformCfg = createDefaultEsmPreset().transform;

export default {
    extensionsToTreatAsEsm: [...TS_EXT_TO_TREAT_AS_ESM],
    moduleFileExtensions: [
        "js",
        "jsx",
        "mjs",
        "cjs",
        "ts",
        "tsx",
        "mts",
        "cts",
        "json",
        "node",
    ],
    testEnvironment: "node",
    transform: {
        ...tsJestTransformCfg,
        /*
        "^.+\\.(ts|tsx|mts|cts)$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.json",
                useESM: true,
            },
        ],
        */
    },
} satisfies Config;
