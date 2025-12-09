# Shared state

To understand how to use shared atate, we'll start with an enclosed state and modify it. Enclosed state is the simpliest though, you'll hardly find any real world applications for it. None the less, it is a good starting point.

but of course the apis are ordered by complixity matching the natural growth of a project. so as your project grows, you should advance further down in this article

## Enclosed State

## Props

## Props Down Events up

### Bindable

## what we learned so far

if you only use the above techniques, you're still heading the ceiling o prop drilling, which where you want to send a state from the parent to some great grandchild and all the intermediate descendents are simply passing it along, no usage of it at all. by convention, prop drilling more than 2 times and you should consider refactoring to the techniques below.

## Snippets

## what we learned so far

up to the point, the state is still quite coupled with the ui component, but as complexity grows, apis like props and snippets are simply not enough. from here on, the state is detached from a component and is created in its own file (\*.svelte.js)

## context

## global

this is considered a catchall, and is not encouraged. As with all catchalls, it is often to be the "easist". you'll notice this is smilar with context, just that the state is initalized within the file instead of in the parent components.

while it seems simpler at first, there are many footguns
link to why globals suck

<!-- old -->

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
