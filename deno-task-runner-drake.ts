/**
 * ==========================================================================
 * ==========================================================================
 * Tasks runner in Deno - equivalent of makefile called Drake
 * where shell command can be written to be executed.
 * Common use with Deno is to handled definitely those specifics permissions
 * in this file to avoid to be overwhelmed by all those in order to ease the
 * worflow while running deno files with permissions and then run this file
 * ( handling permissions by permissions ) with the flag -A.
 * see --> https://deno.land/x/drake
 *		0. KEYWORDS
 * 		1. EXECUTE FILES WITH PERMISSION SIMPLE WAY
 * ==========================================================================
 * ==========================================================================
 */

/**
  * 0. KEYWORDS
  * 	desc 	- describe function: describes the task
  * 			> desc(<string>)
  *
  * 	task 	- task function: name of the action, action to process ( function )
  * 			> task( '<name>', <function-to-run> )
  *
  * 	run 	- run function: execute all tasks
  * 			> run()
  *
  * 	sh		- sh function: give the possibility to write shell commands [ works w/ asynchronous and awaiting executions ]
  * 			> sh( <command/task to run >)
  */

/**
   * * 1. EXECUTE FILES WITH PERMISSION SIMPLE WAY
   *  As mentionned previously, it could be painful to handle each permissions
   * for each file: the common use would be to use Drake ( Makefile like )
   * to specify each permission needed by case and then run this specific file
   * ( this current one where you list all permissions needed case by case ) with
   * the permission "--allow-all" or "-A" as you've been careful while writing it.
   * 
   */

import { desc, run, task, sh } from "https://deno.land/x/drake@v1.2.6/mod.ts";

desc("Minimal Drake task");
task("helloTask", [], async function () {
  console.log("Hello from task runner Drake!");
  await sh("deno run --allow-env deno-permissions.ts");
});

run("helloTask"); // ✅ runs the task with a name "helloTask"

/**
 * USE CASES
 * To run a task: "deno run <permissions> <fileName> <task>"
 * ❌ "deno run -A  drake-example.ts' // Uncaught PermissionDenied...
 * ✅ "deno run -A  drake-example.ts helloTask' // ✅ Successfully installed permissions...
 */
