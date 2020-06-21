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