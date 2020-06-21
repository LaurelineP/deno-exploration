/**
 * ==========================================================================
 * ==========================================================================
 *		0. START CODING something
 * 		1. RUNNING THE CODE in deno
 * 		2. ENABLING PERMISSIONS & RUN CODE
 * 		3. OTHERS PERMISSIONS OPTIONS
 * 		4. 
 * ==========================================================================
 * ==========================================================================
 */



/**
 * 	0. START CODING 
 *  write regular code + using environment username to personnalize the
 * 		message logged ( w/ Deno.env ) 
 * 		Arguments to use ( both within code and terminal ):
 * 			- for mac: 		USER
 * 				- bash ( Linux, MacOS within terminal ):		$USER
 * 
 * 			- for windows: 	USERNAME
 * 				- cmd prompt ( == within terminal ): 			$env:USERNAME
 */
	console.log('Hello', Deno.env.get("USER") );

/**
 * 1. RUNNING THE CODE
 * To run within your terminal
 * 		> deno run <yourFile>
 * 		> deno run ./permissions/main.ts
 * 
 * Which will return an "Uncaught PermissionDenied" error 
 * explaining the need of passing the option "--allow-env". 
 */


 /**
  * 2. ENABLING PERMISSION & RUN CODE
  * To run within your terminal, permissions are before file argument
  * 	> deno run <permission> <yourFile>
  * 	> deno run allow-env ./permissions/main.ts
  * which returns --> Hello laureline
  */

  /**
   * 3. OTHERS PERMISSIONS OPTIONS
   * Indeed we can pass permission allong running the file this way of doing
   * could become quite painful, especially working with teams that end up also passing
   * those permissions to the file running it. 
   * There is another solution wich help among team ( which individually --> has different
   * environments and IDEs ) > installed permissions.
   * 	- inline command line permissions ( being what we've done until now )
   * 	- installed permissions: 
   * 		> deno install <permission> <fileName> <optional-renamed-project>
   * 	This will 
   */