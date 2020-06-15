/**
 * 0. Mere small typescript program
 */
const food:string = "food";

food === 'love'
	? console.log('🦕 ...Deno is born')
	: console.log(`🥚 ...needs ${food}`);


/**
 * 1. Deno.args : array of arguments passed while executing this file  
 * by running within the terminal   
 * 		--> deno run deno.ts 'this is our argument(s): <arguments-passed>'
 */

// ✨ NB: Deno here is called a nameSpace
console.log(`This is our argument(s): ${ Deno.args } ` );
