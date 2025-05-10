---
title: View Transition Api
publish: false
tags:
---

<script setup>
import SvelteRepl from '../../Svelte.vue'
import SvelteLabRepl from '../../SvelteLab.vue'
import App from './view-transition-api/svelte-app.svelte?raw'
import A from './view-transition-api/kit-+layout.svelte?raw'
</script>

## Simple Animations

### Svelte

:::code-group
<<< ./view-transition-api/svelte-app.svelte [App.svelte]
:::

<SvelteRepl  :files="[
	{
		name:'App.svelte',
		contents:App
	},
]" />

### Kit

:::code-group
<<< ./view-transition-api/kit-+layout.svelte [routes/+layout.svelte]
:::
<SvelteLabRepl :files="[
	{
		name:'src/routes/+layout.svelte',
		contents:A
	},
	{
		name:'src/routes/+page.svelte',
		contents:'home'
	},
	{
		name:'src/routes/about/+page.svelte',
		contents:'about'
	},
]" />

## Complex Animations

TBD

## References

- https://svelte.dev/blog/view-transitions
