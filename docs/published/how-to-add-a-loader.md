# How To Add A Loader

There are different patterns depending on the situation. This gives the developer fine-tune control over when and where a loader is render while adhering to web standands and best practices.

:::

## On Client-Side Navigation

This applies when the user is navigating between pages via the [client side router](https://svelte.dev/docs/kit/@sveltejs-kit#Navigation). The `type` property can be used to specify the kind of navigation (i.e. `if navigating.type === "form"`).

```svelte
<script>
	import { navigating } from '$app/state'
	import { onNavigate } from '$app/navigation'

	let { children } = $props()

	const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
	// Simulate a network delay
	onNavigate(() => sleep(3000))
</script>

<header>
	<nav>
		<a href="/">/root</a>
		<a href="/about">/about</a>
	</nav>
</header>

<main>
	{#if navigating.type}
		loading...
	{:else}
		{@render children()}
	{/if}
</main>
```

## On Form Action

This applies when using a form action.

```svelte
<script>
	import { enhance } from '$app/forms'
	let loading = false
</script>

<form
	method="POST"
	use:enhance={({ cancel }) => {
		if (loading) return cancel()
		loading = true

		return ({ update }) => {
			update().finally(() => (loading = false))
		}
	}}
>
	{#if loading}
		loading...
	{:else}
		<!--show UI-->
	{/if}
</form>
```

## Streaming with Promises

While the official docs explains this as the pattern to use for adding a loader. This approach is generally discouraged due to the following limitations:

- not all platforms support streaming
- it lacks SEO campatibility
- it doesn't enable Progressive Enhancement.
- it relies on Javascript
- response headers and status code cannot be modified
- unhandled promise rejections could crash the server
- cause flickering when the load fn reruns since the promise needs to resolve again

Checkout the [conditional streaming](./conditional-streaming) pattern which addresses some of these issues.

## On Server-Side Navigation

This applies when the user first arrives at your site or when `CSR = false`. We will use [Conditional Streaming](./conditional-streaming) to render a loader.

This tries to solve most of the errors mentioned in the previous section.

:::code-group

```js [+page.server.js]
export const load = async () => {
	const promise = getDataFromApi()
	const result = await Promise.race([delay(200), promise])

	return {
		maybeSlow: result ?? promise,
	}
}

const getDataFromApi = async () => {
	await delay(Math.random() < 0.5 ? 50 : 3000)
	return '😴'
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms))
```

```svelte [+page.svelte]
<script>
	let { data } = $props()
</script>

{#await data.maybeSlow}
	loading...
{:then result}
	{result}
{/await}
```

## References

- https://svelte.dev/tutorial/kit/navigating-state
- https://snippets.khromov.se/add-a-loading-indicator-to-a-form-action-in-sveltekit/
