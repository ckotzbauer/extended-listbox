import { exists, copyFile, mkdir, rename, readdir } from "fs";
import { promisify } from "util";

function logErr(e: Error | string) {
    console.error(e);
}

async function postBuild() {
    try {
        const pathExists = await promisify(exists)("dist/types");
        if (!pathExists) {
            await promisify(mkdir)("dist/types");
        }

        const files = await promisify(readdir)("dist");
        files.forEach(async (fileName) => {
            if (fileName.endsWith(".d.ts")) {
                await promisify(rename)(`dist/${fileName}`, `dist/types/${fileName}`);
            }
        });

        await promisify(copyFile)("src/typings.d.ts", "dist/typings.d.ts");
    } catch (e) {
        logErr(e);
    }
}

postBuild();
