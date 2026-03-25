---
title: Polyfill
publish: false
tags:
---

<script setup>
import SvelteRepl from '../../Svelte.vue'
import App from './polyfill/App.svelte?raw'
import Polyfill from './polyfill/Polyfill.svelte?raw'
</script>

## Sveltekit

TBD

## Svelte

:::code-group
<<< ./polyfill/App.svelte
<<< ./polyfill/Polyfill.svelte
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
