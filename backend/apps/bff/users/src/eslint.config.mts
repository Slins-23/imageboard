import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import unicorn from "eslint-plugin-unicorn";
import n from "eslint-plugin-n";
import tsdoc from "eslint-plugin-tsdoc";
import prettier from "eslint-config-prettier";

import { fileURLToPath } from "node:url";
import path from "node:path";

const filename = fileURLToPath(import.meta.url);
const cwd = path.dirname(filename);

export default defineConfig([
    {
        ignores: [
            "node_modules/**",
            "build/**",
            "dist/**",
            ".next/**",
            "out/**",
            "coverage/**",
            "*.d.ts",
        ],
    },

    n.configs["flat/recommended-module"],
    unicorn.configs.recommended,

    ...tseslint.configs.strictTypeChecked,

    {
        plugins: {
            tsdoc,
        },

        files: ["**/*.{ts,mts,tsx,js,mjs,cjs}"],

        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: 2025,
            sourceType: "module",
            parserOptions: {
                project: true, // better than projectService for most cases
                tsconfigRootDir: cwd,
            },
        },

        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_" },
            ],
            "no-use-before-define": "off",
            "@typescript-eslint/no-use-before-define": "error",
            "require-await": "off",
            "@typescript-eslint/require-await": "warn",
            "no-console": "off",
            "unicorn/prevent-abbreviations": "off",
            "unicorn/no-null": "off",
            "no-underscore-dangle": "off",
            "no-magic-numbers": "off",
            "unicorn/no-useless-undefined": "off",
            "n/no-missing-import": "off",
            "n/no-unpublished-import": "off",
            "@typescript-eslint/consistent-type-imports": "warn",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-misused-promises": "error",
        },
    },

    prettier,
]);
