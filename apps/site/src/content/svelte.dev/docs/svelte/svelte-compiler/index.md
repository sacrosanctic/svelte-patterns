# CompileOptions

## rune

Enforce Rune mode

### Per Component

:::code-group

```svelte [Component.svelte]
<svelte:options runes={true} />
<script>
	// ...
```

:::

- https://svelte.dev/docs/svelte/svelte-options

### Per App

:::code-group

```js [svelte.config.js]
const PACKAGE_NAME = ...
const config = {
	compilerOptions:{
		// whole app (including dependencies)
		runes: true

		// whole app (excluding dependencies)
		runes: ({ filename }) => (filename.includes('node_modules') ? undefined : true)

		// per dependency
		runes: ({ filename }) => (filename.includes(`node_modules/${PACKAGE_NAME}`) ? true : undefined)
	}
}

export default config
```

:::
