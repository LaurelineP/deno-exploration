# Deno commands cheat sheet

## Upgrade deno
```deno upgrade```

## Running files
```deno run <file>```
```deno run <permissions> <file>```

## Dependencies inspector
```deno info "<file>"```
```deno info "<url>"```

## Install permissions
This will install a deno program with all permissions it needs to execute
``` deno install <permissions> <fileName> [-n <name-of-executable> ]```

## Cache
Using ```--reload``` flag will download again the dependencies  
( e.f. if an update occured for the module)
```deno run --reload <file>```  

Manually caching dependencies into DENO_DIR path
```deno cache <file>```

Caching using lock file
```deno cache --lock=lock.json --lock <file-with-deps>```
```deno cache --lock=lock.json --lock-write <file-with-deps>```

## Bundle ( as Webpack )
```deno bundle <inputFile> <outputFile>```

## Debug
```<cmd> --inspect```
```<cmd> --inspect-brk```

## Formatter ( as Prettier)
```deno fmt```

## Testing
```deno test```

## Linter
```deno linter```

## Documentation ( using JSDoc )
```deno doc```