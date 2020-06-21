import { desc, run, task, sh } from "https://deno.land/x/drake@v1.2.3/mod.ts";


/* Drake acts like a messenger as with sh we run the permissions;
	therefore we can run this current file with deno --> with all permissions
	( remember: this current file will be only runned by you or your teams )
*/

// desc – a minimal task description
desc("Minimal Drake task");

// task - kind of label the task to be called later on while running the deno command
task("helloTask", [], async function() {
	console.log("Hello from task runner Drake!");
	await sh('deno run --allow-env main.ts');
});

/**
 * run – executions of tasks through command line using task-name ( when no args provided )
 * 		--> deno run -A drake-example.ts helloTask
 * */
// run(); // runs the task passed as command line args 


/**
 * run – executions of tasks through command line using task-name ( when provided args )
 * 		--> deno run -A drake-example.ts
 * */
run('helloTask'); // ✅ runs the task with a name "helloTask"


/**
 * To run a task: "deno run <permissions> <fileName> <task>"
 * ❌ "deno run -A  drake-example.ts' // Uncaught PermissionDenied...
 * ✅ "deno run -A  drake-example.ts helloTask' // Uncaught PermissionDenied...
 */