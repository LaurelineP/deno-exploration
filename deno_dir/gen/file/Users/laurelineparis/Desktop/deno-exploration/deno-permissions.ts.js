"use strict";
/**
 * ==========================================================================
 * ==========================================================================
 *		0. START CODING something
 * 		1. DENO RUN WITHOUT PERMISSIONS
 * 		2. DENO RUN WITH PERMISSIONS
 * 		3. DENO INSTALL PERMISSIONS ( AUTO NAMING )
 * 		4. DENO INSTALL PERMISSIONS ( CUSTOM NAMING )
 * ==========================================================================
 * ==========================================================================
 */
/**
 *	0. START CODING something
 * 	Let's log something requiering permissions and exploit known context
 *
 */
console.log(`Hello ${Deno.env.get('USER')}`);
/**
 * 1. DENO RUN WITHOUT PERMISSIONS
 * Run the usual command: - deno run <file>
 * 		> deno run deno-install-permissions.ts
 * // Uncaught PermissionDenied
 */
/**
* 2. DENO RUN WITH PERMISSIONS
* Run the command with permissions: - deno run <permissions> <file>
* 		> deno run <permissions> deno-install-permissions.ts
*		> deno run --allow-env deno-install-permissions.ts
* // Compile <filePath>
* // Hello <USER>
*/
/**
 * 3. DENO INSTALL PERMISSIONS ( AUTO NAMING )
 * see --> https://deno.land/manual/tools/script_installer
 * Run the command with permissions: - deno install <permissions> <file>
 *		> deno install <permissions> deno-install-permissions.ts
 * 	> deno install --allow-env deno-install-permissions.ts
 * // Compule <filePath>
 * // ✅ Successfully installed deno-install-permissions
 * // <executable-command-path-location>
 * Then run the command deno-install-permissions
 */
/**
* 4. DENO INSTALL PERMISSIONS ( CUSTOM NAMING )
* see --> https://deno.land/manual/tools/script_installer
* Run the command with permissions: - deno install <options-n <custom-name>><permissions> <file>
* 	> deno install <options-n <custom-name>> <permissions> deno-install-permissions.ts
* 	> deno install -n executabletest <permissions> deno-install-permissions.ts
* // Compule <filePath>
* // ✅ Successfully installed deno-install-permissions
* // <executable-command-path-location>
* Then Run "executabletest"
* This will run your file
*/ 
//# sourceMappingURL=file:///Users/laurelineparis/Desktop/deno-exploration/deno_dir/gen/file/Users/laurelineparis/Desktop/deno-exploration/deno-permissions.ts.js.map