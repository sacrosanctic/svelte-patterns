---
title: How To Create A Dialog Component
publish: false
tags: component
---

<script setup>
import SvelteRepl from '../../Svelte.vue'
import FactoryApp from './how-to-create-a-dialog-component/factory-App.svelte?raw'
import FactoryDialog from './how-to-create-a-dialog-component/factory-Dialog.svelte?raw'
import SingletonApp from './how-to-create-a-dialog-component/singleton-App.svelte?raw'
import SingletonDialog from './how-to-create-a-dialog-component/singleton-Dialog.svelte?raw'
</script>

## Factory pattern

:::code-group
<<< ./how-to-create-a-dialog-component/factory-App.svelte [App.svelte]
<<< ./how-to-create-a-dialog-component/factory-Dialog.svelte [Dialog.svelte]
:::
<SvelteRepl :files="[
	{
		name:'App.svelte',
		contents:FactoryApp,
	},
	{
		name:'Dialog.svelte',
		contents:FactoryDialog,
	},
]" />

## Singleton pattern

:::code-group
<<< ./how-to-create-a-dialog-component/singleton-App.svelte [App.svelte]
<<< ./how-to-create-a-dialog-component/singleton-Dialog.svelte [Dialog.svelte]
:::
<SvelteRepl :files="[
	{
		name:'App.svelte',
		contents:SingletonApp,
	},
	{
		name:'Dialog.svelte',
		contents:SingletonDialog,
	},
]" />

## Reference

- https://svelte.dev/playground/modal - Example by the core team.
- https://www.captaincodeman.com/dealing-with-dialogs-in-svelte#types-of-modal-dialogs - Captaincodeman goes into on the types of dialogs and advanced feature like transitions.
