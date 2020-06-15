## First interaction with Deno
* ```deno run <file>``` : To execute / run a file with Deno


## Specific to Deno
Deno has some interesting tooling to know :
- **Deno.args** : corresponds to arguments passed to the file executed returning an **array** of arguments passed.

## Under the hood of Deno
* JS and TS:
	* deno compiles ts files and translate down to js
	* if deno has no ts files then the compiles process is not applied
	* deno then send js file into V8 engine

* Deno Process
Deno launch a process sandbox. It has **rusty_v8** a program written by Deno
people in order to communicate with **Rust** : a secure and extremely performent
**multi-paradigm language** and has a good savety regarding programming memory.

**LIBUV** ( written in C ) is the core used by NodeJS **to handle asynchronous I/O** ( input / output)
and **Tokio** ( written in RUST ) core it the one worker used by Deno to treat async i/o
