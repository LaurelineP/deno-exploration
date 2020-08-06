/**
 * 0. Mere small typescript program
 */
const needs:string = Deno.args[0];
needs === 'love'
	? console.log('🦕 ...Deno is born')
	: needs !== undefined
		? console.log(`🥚 ...needs ${needs}`)
		: console.log(`🥚 ...apparently needs nothing.`)


/**
 * 1. Deno.args : array of arguments passed while executing this file  
 * by running within the terminal   
 * 		--> deno run deno.ts <arg> // returns 'this is our argument(s): <arguments-passed>'
 * 		--> deno run deno.ts love  // returns 'this is our argument(s): love'
 */

// ✨ NB: Deno here is called a nameSpace
console.log(`This is our argument(s): ${ Deno.args } ` );
