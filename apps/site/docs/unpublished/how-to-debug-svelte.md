---
title: How To Debug Svelte
publish: false
tags:
---

## Describe the problem

- vsc breakpoints
- $inspect
- $inspect.trace
- repl js output

export default defineConfig({
plugins: [sveltekit()],
build:{
sourcemap:'inline'
}
})

- process of elimination

## files too big

```
    	"check-circular": "env CIRCULAR_DEPENDENCY=1 vite build",
```

```
    	process.env.CIRCULAR_DEPENDENCY
    		? circleDependency({
    				outputFilePath: './.circle-dependency.json',
    			})
    		: undefined,
    ],

https://khromov.se/optimize-javascript-bundle-sizes-in-sveltekit-by-using-server-load-functions/
```

## Reference
