---
title: Dynamic Component
description: Learn how to dynamically load components in SvelteKit for A/B testing or CMS-driven content
---

## Describe the problem

- Want to do A/B testing and only load component used
- Has a CMS where the source is unknown at build time

## Solution

**+page.svelte:**
```svelte
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

**+page.js:**
```js
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

**A.svelte:**
```svelte
<script>
	let { data } = $props()
</script>

<div>{data.content}</div>
```

**B.svelte:**
```svelte
<script>
	let { data } = $props()
</script>

<div>{data.content}</div>
```

**Interactive Example - See source code above for implementation details**

## Reference

- https://svelte.dev/tutorial/kit/using-both-load-functions
- https://github.com/khromov/sveltekit-dynamic-component-load-demo
- https://github.com/sveltejs/kit/issues/9775
