import { readFile, writeFile, mkdir, existsSync } from "fs";
import { promisify } from "util";

import { ncp } from "ncp";
import terser from "terser";
import sass, { Result } from "sass";
import autoprefixer from "autoprefixer";
import postcss from "postcss";

import * as rollup from "rollup";
import rollupConfig from "./rollup";

import * as pkg from "../package.json";
const version = `/* extended-listbox v${pkg.version},, @license MIT */`;

const paths = {
    style: "./src/styles/extended-listbox.scss",
};

function logErr(e: Error | string) {
    console.error(e);
}

async function readFileAsync(path: string): Promise<string> {
    try {
        const buf = await promisify(readFile)(path);
        return buf.toString();
    } catch (e) {
        logErr(e);
        return e.toString();
    }
}

async function uglify(src: string) {
    const minified = await terser.minify(src, {
        output: {
            preamble: version,
            comments: false,
        },
    });

    return minified.code;
}

async function buildBundleJs() {
    const bundle = await rollup.rollup(rollupConfig);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return bundle.write(rollupConfig.output as rollup.OutputOptions);
}

async function buildScripts() {
    try {
        await buildBundleJs();
        const transpiled = await readFileAsync("./dist/extended-listbox.js");
        promisify(writeFile)("./dist/extended-listbox.min.js", await uglify(transpiled));
    } catch (e) {
        logErr(e);
    }
}

async function transpileStyle(src: string, compress = false) {
    return new Promise<string>((resolve, reject) => {
        sass.render(
            {
                file: src,
                outputStyle: compress ? "compressed" : "expanded",
            },
            async (err: Error | undefined, result: Result) =>
                !err ? resolve((await postcss([autoprefixer]).process(result.css.toString())).css) : reject(err)
        );
    });
}

async function buildStyle() {
    try {
        await Promise.all([
            promisify(writeFile)("./dist/extended-listbox.css", await transpileStyle(paths.style)),
            promisify(writeFile)("./dist/extended-listbox.min.css", await transpileStyle(paths.style, true)),
        ]);
    } catch (e) {
        logErr(e);
    }
}

async function ensureDistFolder() {
    try {
        if (!existsSync("./dist")) {
            await promisify(mkdir)("./dist");
        }
    } catch (e) {
        logErr(e);
    }
}

async function copySass() {
    await promisify(ncp)("./src/styles", "./dist/scss");
}

async function start() {
    ensureDistFolder();
    buildScripts();
    buildStyle();
    copySass();
}

start();
