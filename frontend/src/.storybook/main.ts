import type { StorybookConfig } from "@storybook/nextjs-vite";

const nginxPort = Number(process.env["NGINX_PORT"] ?? 8080);

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@chromatic-com/storybook",
        "@storybook/addon-vitest",
        "@storybook/addon-a11y",
        "@storybook/addon-docs",
        "@storybook/addon-onboarding",
    ],
    framework: "@storybook/nextjs-vite",
    staticDirs: ["../public"],
    viteFinal: async (viteConfig) => ({
        ...viteConfig,
        server: {
            ...viteConfig.server,
            hmr: {
                ...(typeof viteConfig.server?.hmr === "object"
                    ? viteConfig.server.hmr
                    : {}),
                clientPort: nginxPort,
            },
        },
    }),
};
export default config;
