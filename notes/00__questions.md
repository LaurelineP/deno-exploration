# Questions

## Is JavaScript an interpreted language ?

## What are the commons memory leaks cases ?

## What possible problems can you see in synchronous code ?
UX wise: it blocks the user experience until a process is done.
Code-wise it means that a function asynchrone would be 
- first executed
- secondly beeing process ( which would block UX )
- finally will end up finishing the process ( which only then
would "unblock" UX ).

## Why using JavaScript Engine ( synchronous language ) then ?
Generally when it comes to JS engine, JavaScript is most of the time
not used only by itself, it relies on asynchronous code.
- JavaScript Engine being synchronous code
- JavaScript Runtime being asynchronous code: represents the JavaScript
Engine delegation : beeing given the task of processing an element, once processed
this will be pushed to the CallBack Queue, which will check if the JavaScript
Engine's call stack is empty in order to give it back the returned callback to process.