---
title: Polyfill
publish: false
tags:
---

<script setup>
import SvelteRepl from '../../Svelte.vue'
import App from './App.svelte?raw'
import Polyfill from './Polyfill.svelte?raw'
</script>

## Sveltekit

TBD

## Svelte

:::code-group
<<< ./App.svelte
<<< ./Polyfill.svelte
:::

<SvelteRepl name="Polyfill" :files="[
	{
		name:'App.svelte',
		contents:App
	},
	{
		name:'Polyfill.svelte',
		contents:Polyfill
	},
]" />
