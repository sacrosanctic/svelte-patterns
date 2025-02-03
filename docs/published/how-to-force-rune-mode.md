---
title: How To Force Rune Mode
---

## Per Component

:::code-group

```svelte [Component.svelte]
<svelte:options runes={true} />

...
```

:::

- https://svelte.dev/docs/svelte/svelte-options

## Per Dependency

:::code-group

```js [svelte.config.js]
const PACKAGE_NAME = ...

const config = {
	...
	vitePlugin: {
		dynamicCompileOptions: ({ filename }) => ({ runes: filename.includes(`node_modules/${PACKAGE_NAME}`) }),
	},
}

export default config
```

:::

- https://svelte.dev/docs/svelte/svelte-compiler#CompileOptions:~:text=runes%3F%3A%20boolean%20%7C%20undefined%3B

## Per App

:::code-group

```js [svelte.config.js]
const config = {
	...
	compilerOptions:{
		runes: true
	}
}

export default config
```

:::

- https://svelte.dev/docs/svelte/svelte-compiler#CompileOptions:~:text=runes%3F%3A%20boolean%20%7C%20undefined%3B

::: info
This is a global setting, it effects the whole app including upstream dependencies like `node_modules`
:::
