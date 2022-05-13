import { join } from 'https://deno.land/std/path/mod.ts';

async function readFile( file: string ) {
	let res = await Deno.readTextFile( file );
	console.log( res );
}

/**
 * Static path: could throw error 
 * as this is not resolving path since the
 * path resolution is written
 * */
const staticPath = './notes/00__questions.md';


/**
 * Dynamic path: resolved path using "join" from
 * library path --> this resolve paths ( taking count of
 * current OS )
 */
const dynamicPath = join('notes', '00__questions.md')

readFile( dynamicPath );