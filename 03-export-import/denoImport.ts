import { denode } from './denoExport.ts';
import "https://deno.land/std/examples/welcome.ts";

let word = 'NODE'
console.log(`💌 original word: ${ word } --> reversed: ${ denode('NODE') }`)