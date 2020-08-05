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

## What is caching ?
Caching is a computer process storing data already loaded to a location  
to avoid downloading already loaded dependencies each time to get faster for  
the next execution and to depend on internet requests.

## How Deno works with caching ?
a ```DENO_DIR``` global variable is available which should correspond to the OS'  
default caching path.
<img src = "./notes/03__deno-cache-location.png" title = "OS paths of Deno's default caching location"></img>
By default caches loaded data to a default location into the computer.
However, let's say you really need to download those dependencies into the project,  
this is possible to re-set the ```DENO_DIR``` path value like so:  
```DENO_DIR=<folder-path>```  

## In which circumstance we might want a lock.json file ?
```lock.json``` file is the equivalent of ```package-lock.json``` Node's file,  
keeping a specific version of the modules loaded within the project.  
This is useful while working on the same project with a team and would like  
to have the same dependencies versions if they work on it.

## What's are the deps.ts and mod.ts files ?
- ```deps.ts``` file: is equivalent to Node's ```package.json``` file.
This will keep all dependencies list needed for the project.
- ```mod.ts``` file: is a Rust convention equivalent to Node's default
entry point ```index.js```.

