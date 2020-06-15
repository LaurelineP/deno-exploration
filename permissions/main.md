# Exploring permissions
Lets discover permissions within Deno with ```main.js```
- Init code
- Running the code
- Enabling permissions & running the code

## Init code
Let's say you want to console log greeting using **Deno.env**  
methods. 
```js
console.log('Hello ', Deno.env.get('USER')) // USER for Mac, USERNAME for Windows  
```

## Running the code
``` deno run <yourFile> ```
In this example we will encounter an error as those env variables  
are quite sensitives data for Deno  
( ==> for security purpose )
This is where we need to enable those permissions using flags permissions.

## Enabling permissions & run code
``` deno run --allow-env <yourFile> ```
This will finally run the code using the env variable

## Other permissions options
Good to know: regarding IT security, it is well known to whitelist  
permissions needed for a program --> which controls better what is needed  
instead of enabling all permissions
- Inline command line permissions
``` deno run <permission> <fileName> ```
This will allow you to use a certain permission at the current execution of  
the line above.
Meaning you need to always specify the permission while running the command  
which is combursome at the end
- Installed permissions
``` deno install <permission> <fileName> ```
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
