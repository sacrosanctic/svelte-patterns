---
title: Dynamic Component
publish: false
tags: pattern
---

## Describe the problem

- Want to do A/B testing and only load component used
- Has a CMS where the source is unknown at build time

## Solution

:::svelte-repl

```svelte [src/routes/+page.svelte]
<script>
	import A from './A.svelte' // [!code --]
	let { data } = $props()
</script>

<A>{data.content}</A> // [!code --]
<data.component>{data.content}</data.component> // [!code ++]
```

<!-- const getComponent = (name) => {
	// alias does not work with dynamic import
	// https://github.com/vitejs/vite/issues/10460
	return import(`./${name}.svelte`)
} -->

```js [src/routes/+page.js]
export const load = async () => {
	const module = // [!code ++]
		Math.random() < 0.5 // [!code ++]
			? await import('./A.svelte') // [!code ++]
			: await import('./B.svelte') // [!code ++]
	const component = module.default // [!code ++]

	return {
		component, // [!code ++]
		content: 'Hello world.',
	}
}
```

<<< ./A.svelte
<<< ./B.svelte

:::

## Reference

- https://svelte.dev/tutorial/kit/using-both-load-functions
- https://github.com/khromov/sveltekit-dynamic-component-load-demo
- https://github.com/sveltejs/kit/issues/9775
