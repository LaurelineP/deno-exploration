# Typescript
A type-checking tool

## Features
- type-checking even before running code

## Dynamic / Static type
NB: Javascript is dynamically typed
### Dynamically typed language ( JS )
Needs a declaration of an object + a value to **assign**  
No specification of what type is the value, the scripting  
language does it during runtime.
- PROS:
	- easier to read
	- more flexible
	- faster development
- CONS:
	- not self documented
	- increase bugs / errors 
###  Statically types ( C++ )
Needs to specify what type of value we'd like to assin,  
then declare the object name and finally assign the value.  
- PROS:
	- self documented
	- helps with completion
	- less bugs / errors in production
- CONS:
	- harder to read ( to also consider for new team members )
	- forget writting good tests - static typing are not tests
	- slower development process

TypeScript is the tool needed to transform the JS dynamically typed  
into a static type-like.

## Strongly VS Weakly typed
Weekly typed languages would not output an error whereas strongly type would.
JavaScript is weakly typed which means it can do without throwing an  
error:
```js
var a = "hello";
a + 12 = "hello12"; // concatenation context cf "type coercion"
// type coercion explained --> https://www.freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839/#:~:text=Type%20coercion%20is%20the%20process,Symbol%20(added%20in%20ES6)// visual understanding ofctype coercion --> https://dorey.github.io/JavaScript-Equality-Table/
``` 

## Static typing tools for JS
- TypeScript - created by Microsoft - having its own compiler
- Flow - created by FaceBook - relies on Babel transpiler to type-check
- ReasonML - created by FaceBook - a whole easy to learn language on its own
- Elm - - a whole easy to learn language on its own with its compiler


## Commands 
 ( using Node )  
 

| Commands | Meanings	|
|-|-|
| ```sudo npm install -g typescript``` | Install TypeScript |
| ```tsc <file>```  | Compiles ts file to js |
| ```tsc <file> --watch```  | Compiles ts file to js in watching mode |
| ```tsc --init```  | Init a tsconfig.json file |


## File extension
```file.ts``` which will be compile when executing ```tsc file.ts```.  
This will output file.js

## Syntaxe
TypeScript's syntax change from javascript with element indicating types.

### Types 
| Types |
|-|-|
| boolean |
| number |
| string |
| [] || string[] || number[] || any[] || etc... |

- For variable declaration
<object-declaration> <object-name> : <type-of-value-to-be-assigned> = <value>
```ts
// String
let myString:string 		= 'variable';

// Number
let myNumber:number 		= 42;

// Boolean
let isDifferent:boolean 	= true;


/** Array 2 declarations */
// 
let myStringArr:string[] 	= [ 'hello', 'wold' ];
let myNumberArr:number[] 	= [ 42, 43 ];
let myStringArr:boolean[] 	= [ true, false ];
//
let myStringArr:Array<string> 	= [ 'hello', 'wold' ];
let myNumberArr:Array<number> 	= [ 42, 43 ];
let myStringArr:Array<boolean> 	= [ true, false ];

// null and undefined
let myNull:null = null;
let myUndefined:undefined;

// Tuple
// A certain predicted object format/shape
let myTuple : [ string, number ];
myTuple = [ 'basketball', 5 ];
console.log(myTuple) //return array obj

// Enum
// A certain predicted object format/shape ( classes )
// NB: index start at 1 not 0
enum myEnum : { small = 1; medium = 2; large = 3};
let sm = Size[1];
console.log( myEnum ); //return array obj
console.log( sm ); //return string


// Any type --> to avoid as possible
let myAny:any = 'any type';
```


- For function declaration
<object-declaration> <object-name> : <type-of-value-to-be-assigned> = <value>
```ts
// Void type: nothing to return out from executing func
let myVoidFunc = () : void => {
	console.log( 'void function' )
}

// when returning something from the func: usual type instead of ": void"
let myReturningFunc = () : number => {
	console.log( 'void function' );
	return 1;
}


// never type, ex w/ use case
// --> ex applies to an error func for instance
/**
 * 1. checks the func never return anything
 * 2. checks if a variable is never true;
 * 3. cannot have a reachable end point ( console.log has an end point)
*/
let myErrorFunc = () : never => {
	throw Error('Error detected');
}


// Interface / type ( works great w/ object --> class );
// see differences --> https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c
/** Interface
 * 1. the interface's name always start with a Capital
 * 2. ensure an 'object'-like format passed to argument
 * 3. creates a new name reusable anywhere
 */


// interface --> is like a bluePrint of an expected argumentd
interface MyInterface {
	nb : number,
	str: string,
}
let myInterface = (arg: MyInterface) => {
	console.log( 'myInterface' );
}


/** type ( or 'type alias')
 * 1. ensure an 'object'-like format passed to argument
 * 2. does not creates a new name reusable anywhere
 */
type myInterfaceType {
	nb : number,
	str: string,
}
let myInterface = (arg: myInterfaceType) => {
	console.log( 'myInterface' );
}


/**
 * type assertion: behave as interdace provided ( dangerous )
 * see --> https://basarat.gitbook.io/typescript/type-system/type-assertion
 */
interface MyInterface2 {
	nb : number,
	str: string,
}

let smth = {} as MyInterface2;
```

- Union
are mainly to define a valu could be of different types
```ts
let any: string | number | boolean = string = 'string';
// the value could be either a string, a number or a boolean;
```