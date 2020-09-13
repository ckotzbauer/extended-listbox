import typescript from "@rollup/plugin-typescript";

import { resolve } from "path";
import * as pkg from "../package.json";
import { RollupOptions } from "rollup";

export const getConfig = (opts?: { dev: boolean }): RollupOptions => ({
    input: "./src/index.ts",
    output: {
        file: "dist/extended-listbox.js",
        name: "extended-listbox",
        format: "umd",
        exports: "default",
        banner: `/* extended-listbox v${pkg.version}, @license MIT */`,
        ...(opts && opts.dev ? { sourcemap: true } : {}),
    },
    plugins: [typescript({ tsconfig: resolve("./src/tsconfig.json") })],
    watch: {},
});

export default getConfig();
