# Share state across components

## Description

This setup allows you to share `$state` to different components. It can be updated locally and when the server has new day. It has full type-safety, and most importantly, does not leak any data.

This uses sveltekit's routing so you're able to limit access to the state to only related routes.

## Setup

::: code-group

```ts [src/lib/counter.svelte.js]
export class ReactiveState {
	value = $state()

	constructor(initialValue) {
		this.value = initialValue
	}
}
```

```ts [src/routes/+layout.js]
export const load = () => {
	const randomNumber = Math.floor(Math.random() * 11)
	const counter = new ReactiveState(randomNumber)

	return { counter }
}
```

```svelte [src/routes/+page.svelte]
<script>
	let { data } = $props()
</script>

{data.counter.value}

<button
	onclick={() => {
		data.counter.value++
	}}>add one</button
>
```

```svelte [Child.svelte]
<script>
	import { page } from '$app/state'
</script>

{page.data.counter.value}

<button
	onclick={() => {
		page.data.counter.value++
	}}>add one</button
>
```

REPL: https://www.sveltelab.dev/90t6s7u8l5svxn0

## Global state

state initiated at `src/routes/+layout.js` (top level) is effective global.
