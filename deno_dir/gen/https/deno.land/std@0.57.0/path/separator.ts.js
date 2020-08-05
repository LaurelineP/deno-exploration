// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
/** This module is browser compatible. */
import { isWindows } from "./_constants.ts";
export const SEP = isWindows ? "\\" : "/";
export const SEP_PATTERN = isWindows ? /[\\/]+/ : /\/+/;
//# sourceMappingURL=file:///Users/laurelineparis/Desktop/deno-exploration/deno_dir/gen/https/deno.land/std@0.57.0/path/separator.ts.js.map