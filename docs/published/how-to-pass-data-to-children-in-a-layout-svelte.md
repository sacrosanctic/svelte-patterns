---
title: How To Pass Data To children In a +layout.svelte
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

{@render children(foo)} // [!code --]
{@render children()}
```

```svelte
<script>
	let { children } = $props()
	let { children, header } = $props() // [!code --]
</script>

{@render header()} // [!code --]
{@render children()}
```

https://github.com/sveltejs/kit/issues/627

## Alternatives

### Page State

::: code-group

```svelte [+layout.svelte]
<script>
	import { page } from '$app/state'
	let { children } = $props()
</script>

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

TBD
