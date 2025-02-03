---
title: Props Down Events Up
tags: concept
---

<script setup>
import SvelteRepl from '../../Svelte.vue'
import App from './props-down-events-up/App.svelte?raw'
import Button from './props-down-events-up/Button.svelte?raw'
</script>

"Props Down, Events Up" is a fundamental pattern for managing data flow between components:

- Props Down: Pass reactive state from parent to child using props.
- Events Up: Send updates from child to parent using events.

This creates a clear, predictable data flow, making your components easier to reason about and maintain.

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
