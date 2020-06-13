# DENO

Deno is a **JavaScript** and **TypeScript runtime** using **V8** and build in **Rust**.

* A **secure runtime by default** : no file, network or environment access unless  
 explicitly enabled
* Support **TypeScript** out of the box
* **Ships** only **single executable file**
* Has built-in utilities like a **dependency inspector** ( deno info ) and  
a **code formatter** ( deno fmt )
* Has a set of reviewed ( audited ) **standard modules** that are guaranteed to work with Deno -->  deno.land/std


## Why do we need Deno
Randall, creator of **Node JS** also creator of Deno JS, created Node JS and open the world to JS back in **2009** – initially JS was only for the browser  
until NodeJS –  So why Deno ( doing the same thing as Node i.e. write JS on the server side ).

Deno JS:
* written in **Rust** ( program language written **by Mozilla** )
* has first class TypeScript support ( **by Microsoft** )
* uses **V8** engine by **Google** written in C++ ( same as Node, technology that browser use to  write JS straight into the browser's console ).
Which all suggest that Deno will probably last as for the bakers behind those  
technologies.


## Installation & plugin dedicated
* Mac/Linux : ```curl -fsSL https://deno.land/x/install/install.sh | sh```
* Windows : ```iwr https://deno.land/x/install/install.ps1 -useb | iex```
* Deno Plugin: https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno



# Deno execution environment
Deno runs a REPL ( **R**ead **E**val **P**rint **L**oop ) environment 