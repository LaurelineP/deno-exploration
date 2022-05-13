/**
 * Write a Deno program to list the names
 * of the files in the current directory,
 * similar to 'ls' on Mac OS and Linux or
 * dir on Windows.
 */

 async function listFiles ( file : string ) {
	for await (const dirEntry of Deno.readDir("/")) {
		console.log( dirEntry.name );
	}
 }

 listFiles('./');