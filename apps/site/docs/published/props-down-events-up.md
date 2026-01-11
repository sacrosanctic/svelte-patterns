---
title: Props Down Events Up
tags: concept
---

<script setup>
import SvelteRepl from '../../Svelte.vue'
import App from './props-down-events-up/App.svelte?raw'
import Button from './props-down-events-up/Button.svelte?raw'
</script>

"Props Down, Events Up" is a fundamental pattern for managing data flow between components, ensuring that the parent, as the owner of the reactive state, is the only component responsible for modifying it:

- Props Down: The parent passes the reactive state to the child via props.
- Events Up: The child emits an event to notify the parent, which then updates the reactive state.

:::code-group
<<< ./props-down-events-up/App.svelte
<<< ./props-down-events-up/Button.svelte
:::

<SvelteRepl name="Props Down Events Up" :files="[
	{
		name:'App.svelte',
		contents:App
	},
	{
		name:'Button.svelte',
		contents:Button
	},
]" />

## Reference

- https://svelte.dev/docs/svelte/bind
- https://svelte.dev/docs/svelte/$bindable
- https://svelte.dev/docs/svelte/$props#Updating-props
