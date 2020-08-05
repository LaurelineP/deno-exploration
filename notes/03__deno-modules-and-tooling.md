# DENO MODULES AND TOOLING
The principles of modules are realising **smaller scripts**   
having **exportable objects** ( func, variables, classes, ... )  
to import into another script and consume it within the code.
* Consuming a external module ( like libraries ) would require  
to import the actual internet url.
* Consuming a local module ( script wrote within your project )   
implies only to load module using the path of the file hosting the  
exportable bit of code.
But you can also import files ( better importing files with ts extension )


## Modules
Modules work pretty much the same as ES6 modules aside few things:
- permissions
- import from url ( if third part lib )
- import from local: must have extension written ( !== node )

### Import from local
```import { <object> } from './<path>'; ```;

### Import from external ( URL )
```import { <object> } from '<url>'; ```;
```import '<url>'; ```;
- Dependencies
Using the command  ```deno info <file>``` would display a tree dependencies  
alongside all info needed ( current file localisation, dowloaded elements,  
 type of files and external URLs used )

 NB: ```<module-external-url>/mod.ts``` might be needed to tell this is a module.  
 this is kind of the default entry point ( as in node index.js was fullfilling  
  the same role ) - which is a **Rust** convention.

 ### Deno's Packages, modules ...
 🔗See --> https://deno.land/std
 🔗See --> https://deno.land/x

 - ```std``` represent the official modules ( approved )
 - ```x``` represent non-official modules

 Deno has a standard library written by the ones developping Deno.
 Requiring a certain standard, the community can developed by other developers  
 but then it will be reviewed by Deno people in order to be approved.  
 Having a standard library within Deno make those official.  

## Caching
Caching: means storing data already seen / dowloaded previously   
in order to get faster.  
Deno's caching it within your computer at a specific location.  
This is a game changer as once it is cached, we don't need internet  
anymore to run the project.
<img src = "./03__deno-cache-location.png" title = "Deno default caching path location" >

- First: change ```DENO_DIR``` path value to your desired ```<folder-path>```;  
Depends on your 
- Second: run ```deno cache <file>``` which will doawnload all dependencies to the new path  

## Modules versionning
For each module there is a version, that version are bunch of digit after "@".  
Either this is checkable and copy/paste from deno land module's page or either  
by writing the version at the end of the import.

## Any package.json ? 
Comming from Node we might be used to find within project a package.json.  
However in Deno there are no package.json as we download from URLs.  
See --> Deps.ts file

## Deps.ts file
"Deps" Standing for "dependencies" and "deps.ts" will have the role of  
listing all dependencies to use while importing ( from lock.json indeed ).  
Modules, within this ```deps.ts`` file, will be directly **exported**  
to render available to your project.  
But what about the equivalent of ```package-lock.json``` ?

## Lock Dependencies
Using ```--lock``` flag while running a command + providing the file to  
write those dependencies.


- create ```lock.json``` 
- ```deno cache --lock=lock.json --lock-write src/deps.ts```
	- ```--lock=lock.json``` : specifies to use the file lock.json
	when we use the flac ```--lock```
	- ```--lock-write``` : specifies to allow writing process toward 
	the specified file


## Deno tooling
See --> https://deno.land/manual/tools
Within the environment using Deno, there are out of the box few common toolings  
- Standard built-in tooling
( bundler, debugger, dependency inspector, documentation generator, formatter,  
test runner, linter )
