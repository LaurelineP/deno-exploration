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


## Import from local
```import { <object> } from './<path>'; ```;

## Import from external
```import { <object> } from '<url>'; ```;
```import '<url>'; ```;