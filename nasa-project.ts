import { join } from 'https://deno.land/std/path/mod.ts';

async function readFile( file:string ){
	let res = await Deno.open( file );
	console.log( res );
}

const file = join('resources', 'kepler_exoplanets_nasa.csv');

readFile( file );