/**
 * Deno imports are from url
 * Those url generally host a code provided that devs can use
 */

import { denode } from './deno-module-export.ts';
import 'https://deno.land/std@0.63.0/examples/welcome.ts';

let word = 'NODE'
console.log(`💌 original word: ${ word } --> reversed: ${ denode('NODE') }`);