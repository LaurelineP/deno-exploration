/* Drake APIs. */
export { env } from "./lib/env.ts";
export { desc, execute, run, task } from "./lib/registry.ts";
export { abort, debug, DrakeError, glob, log, makeDir, quote, readFile, sh, shCapture, updateFile, vers, writeFile, } from "./lib/utils.ts";
import { env } from "./lib/env.ts";
import { help } from "./lib/help.ts";
import { vers } from "./lib/utils.ts";
env("--abort-exits", true);
env().parseArgs([...Deno.args]);
if (env("--help")) {
    help();
}
else if (env("--version")) {
    console.log(vers());
}
//# sourceMappingURL=file:///Users/laurelineparis/Desktop/deno-exploration/deno_dir/gen/https/deno.land/x/drake@v1.2.3/mod.ts.js.map