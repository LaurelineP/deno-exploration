# JavaScript History
JavaScript was created by **Brandon Eich** which also created
the first javascript engine ( which firefox still uses )

A JavaScript Engine helps to "translate" JS code into binary
so that the computer understands the code to execute.
And everyone can write their own engine 
( which is only just a programm script ) but should follow
ECMASCRIPT standards.

## ECMASCRIPT
People validating JavaScript standard syntaxes

## Inside the Engine:
* JavaScript file is sent to the engine
* The engine's **parser** process to a **lexical analysis**
breaking the code into "tokens" to id the meaning of a bit of code
* the tokens are formed into **AST** ( **A**bstract **S**yntax **T**ree )
--> see how it works: https://astexplorer.net
* which then is sent to > an interpreter > then a profiler > then compiler
to transform the code translated for computers
* interpreter : translates and read the file line by line, rather quick but 
can turn slow ( especially when it interprets the same code as within a loop -
which is compensed by the compile )
* compiler : unlike interpreter, it doesn't translate on the fly,
it worls ahead of time to compile down to a understanding language for the 
machines. The compiler as a role of optimiser as it is smart enought to not run 
the same code but replacing the code by the repeated output value for instance
which implies to be slower than interpreters but faster running code.
It will read the file to understand what it does and then write another program
with another language
* JIT compiler, offered by browsers
* Profiler also called Monitor: watches our code to propose optimisations which
helps our interpreter to tells what to do to the browser.
As it is run in JIT and analyses repeated code, some code are dispatched to the
compiler.

## Compiler
The compiler optimises the code and in order to do that it has a couple of processes.
Processes:
- inline caching: targets the code line that executes multiple times.
When this happens, inline caching will store the same value in order to
optimise de compilation instead of calling the block of code
- hidden classes: targets the class reused with different values on instanciation.

## Call Stack and Memory Heaps
### Memory Heap
A place to store variables, objects and datas and write operations.
- a place to allocate memory
- to use memory
- to release memory
### Call Stack
A place keeping track of what's happening one by line and responsible for running it
at the right moment in order to execute the code in order - orchestator.
This orchestrator is working with a First In Last Out ( FILO ) mode - meaning 
as it runs while the JS been executed, this call stack will store the executions and 
values to keep track on what to process next: first store function, generally 
corresponding to anonymous == global context being the file reading line by line executions;
will be process last as others executions piles up.
Executing a function is like saying: " please at that moment store the execution " which will
be piled up.
Once the last function being process, this one will get popped of in order to terminate underneath.
Going down to the global context.

## Stack OverFlow
Describes the fact that the stack is filled and not able to pile down.
--> Error: Maximum call stack size exceeded

## Garbage Collection
JavaScript is a garbage collected language meaning: when JS allocates memory.
If the program/ script is not using it, for instance within function, scopes, executions
contexts, this will be removed from the memory heap.
**Unused data stored are removed from the memory heap**.
The garbage collector freeze on the memory heap and prevents what's called **memory leaks** 
from happening. Which at the end trash some unused data automatically.
This is why JS Developpers might think they don't need to worry about memory.

### How does the garbage collectore works ?
Using **Mark and Sweep algorithm**

## Memory Leaks
It is what happens when the memory heap gets too big.
- a loop never ending adding things to an object:
``` let arr = []; for ( let i = 5; i > 1; arr++ ){ arr.push(i-1) }```
3 commons memory leaks:
1. global variable: generally not trashed out
2. event listeners: event listeners never removed === keep adding and adding
which increase the size of the memory heap
3. set interval uncleared: processing code within and creating new object will also
increase the size of the memory heap


## JavaScript Single Threaded programming language
Means that one set of instruction is being process at a time --> which means that
JavaScript is **synchronous** having one stack and one heap


## JavaScript Engine
Represents the JavaScript synchronous code aka the code a developper provide
to be processed --> a program

## JavaScript Runtime
Has the role to treat code taking long to process.
The Web Browser is working on the background while JS code is beeing runned,
which uses the Web API to communicate with JS and let the JS engine know 
that once the Web API is done processing a bit of code, that a value returned to the

- **Call Back Queue** ( also from Web browser API )
This Call Back Queue, part of Event Loop ( from browser ) will repeatly check if 
the Call Stack ( from JS Engine ) is empty.
If it is then the Call Back Queue --> send the call back function back to the call stack.
It does that only when the call stack is empty.
