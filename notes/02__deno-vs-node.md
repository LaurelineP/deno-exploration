# DENO VS NODE

## Deno game changers
- First class TypeScript
- ES Modules ( import / export )
- Security first ( no node_modules + enabling use )
- "Decentralized" modules ( import from url )
- Standard Library ( approved and check: DenoLand )
- Built in Tooling
- Browser Compatible API
- Single Executable
- Async returns Promises
- Opiniated modules.

### TypeScript out of the box
In Deno, **Typescript** is writable out of the box **without installing** anything.
By giving the ".ts" extension to your usual ".js" files.

### ES Modules
- Loading modules
Deno has modules support built-in, which means we can use  
both **import** and **export** keywords anytime.
Before that we used to transpile down to commonJS ( babeljs ) this without anything to install ( like we use to w/ NodeJS ).
From now own, we could simply import an 'url' from website etc.

### Security
One of Deno's concerns was security. NPM was certainly plenty of packages therefore those ones were not "standardized" or check by a verified member of NodeJS;  
the communauty was mainly creating those which leads us to  
security issue. Someone could let some malware code within those packages and directly access your disk and files.
With Deno,there is no need of downlading those as for their Standard Library ( replacing the NPM centralizer of modules ) and you need to specify the authorisation to make so.

- Deno comes w/ authorisations --> which leads us to sandbox topic.
Deno creates a sandbox isolating the whole development environments.
Alongside that topic, containers are also deployable with   
some setted permissions.  
To come back to that "sandbox" concept --> chrome is sandboxed for instance.

<img src = "./02__deno-permissions.png">

### Decentralized modules
Has mentionned previously, no need to install anything therefore, no needs for NPM.
The meaning of "Decentralized" here is to not depend on NPM.  
NPM being owned by Microsoft

### Standard Library
The library that Deno's contributors did approved.

### Building tooling
Running and writting code for your projects might requires  
some great tooling such as 
- TypeScript - type-checking superset
- Jest	- testing library
- Prettier - an opinionated code formater
- Nodemon - watching your files changing to restart   
automatically your server  
- etc ...
Those are actually within Deno, right out of the box without needing to install them.

### Browser Compatible API
Few element we used in front-end project let us actually use  
without installing anything, the browser API  
( fetch, setTimeout, setInterval, addEventListener...).  
Now those are also usable in the back end ( those browser API  
were not existing within Node )

### Single file executable
Deno installation actually install an executable ( which by double clicking open ) and also meaning that it is possible to run javaScript code whenever this file is.
- Details: Deno takes the role of the runtime but also a package   
manager with no dependancies.

### Async returns Promises
All asynchronous code will automatically return a promise ( not always the case in Node ).
Running async code will be translated to a RUST feature and returned as a promise.

### Opiniated Modules
Style Guide within denoland is the guide to create modules.



## Deno security
Deno runs within a SandBox ( kind of a isolated container - VM, Docker ).  
NB: Programming Rule: "Do not trust anybody".  
Here is why permissions were introduced with Deno



## Deno permissions
### Exploring permissions
Lets discover permissions within Deno with ```main.js``` *(02-permissions/main.ts)*
- Init code
- Running the code
- Enabling permissions & running the code

#### Init code
Let's say you want to console log greeting using **Deno.env**  
methods. 
```js
console.log('Hello ', Deno.env.get('USER')) // USER for Mac, USERNAME for Windows  
```

#### Running the code
``` deno run <yourFile> ```
In this example we will encounter an error as those env variables  
are quite sensitives data for Deno --> needing permissions  
( ==> for security purpose )
This is where we need to enable those permissions using flags permissions.

#### Enabling permissions & run code
``` deno run <permissions> <yourFile> ```
This will finally run the code using the env variable

#### Other permissions options
Good to know: regarding IT security, it is well known to whitelist  
permissions needed for a program --> which controls better what is needed  
instead of enabling all permissions

- Inline command line permissions
``` deno run <permission> <fileName> ```
This will allow you to use a certain permission at the current execution of  
the line above.
Meaning you need to always specify the permission while running the command  
which is combursome at the end


- Installed permissions / Executable
``` deno install [-n <name-of-executable> ] <permission> <fileName>```
This **install** specification will write an execution file in order to ease  
each execution to straight away run the program.
By doing so, you ease the execution within a team as various environments might be used,  
which solutionned the differents + including requiered permissions.
	- IDEs
	- OS
Output being an execution file and now it is possible to just write the name of   
the builded file ( as if it were a regular CLI command ) and this action will run the  
program within and run it everywhere ( even out of the current path project you're in  
with the terminal )
⚠️ Problem with 

#### Optimize development mode Drake
```deno run <permission> <fileName> <taskName>```
As the app grows, we will need to allow multiple permissions and some configurations files as part of our developping process--> that is where we will need to run a task runner.
This task runner will orchester some commands and configurations and it will be possible  
using Drake ( a makefile-like ), kind-of the role that ```package.json``` has for node.
It is common to use a drakefile with the permission allow-all ```deno run -A``` as  
while specifying your tasks ( task by task ) you are actually in control of any permissions you are white listing ( no worries )