---
title: How To Pass Data To Page to Layout
---

::: info Written for
Svelte `5.17.3`

Sveltekit `2.15.2`
:::

## Not Supported

This is a current limitation of `+layout.svelte` file.

```svelte
<script>
	let { children } = $props()
</script>

{@render children(foo)} // cannot provide arguments // [!code --]
{@render children()}
```

```svelte
<script>
	let { children, header } = $props() // cannot have other snippets // [!code --]
	let { children } = $props()
</script>

{@render header()} // [!code --]
{@render children()}
```

## Alternatives

### Page State

::: code-group

```svelte [+layout.svelte]
<script>
	import { page } from '$app/state'
	let { children } = $props()
</script>

<svelte:head>
	<title>{page.data.title}</title>
</svelte:head>

<header>
	<h1>{page.data.title}</h1>
</header>

{@render children()}
```

```js [home/+page.server.js]
export const load = async () => {
	return {
		title: 'home',
	}
}
```

```js [about/+page.server.js]
export const load = async () => {
	return {
		title: 'About',
	}
}
```

:::

### Context Api

https://github.com/sveltejs/kit/issues/12928#issuecomment-2450267783

## References

- https://github.com/sveltejs/kit/issues/627
- https://github.com/sveltejs/svelte/discussions/14108
