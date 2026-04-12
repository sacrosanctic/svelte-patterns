---
title: Anatomy of a Svelte Component
category: concept
tags: anatomy of, cheatsheet
---

This article highlights the different parts of a svelte component. What they're called, and their main purpose.

A svelte component has 5 parts.

- component doc
- script module
- script block
- markup
- style block

```svelte
<!--
@component
  `component doc`
-->

<script module>
	// This area is called `script module`
	// The code here is singleton
</script>

<script>
	// This area is called `script block`

	import { browser } from '$app/environment'

	// Runs twice, once on the server and once on the client
	console.log('Hello World')

	if (browser) {
		// Runs once on the client
	}

	import { onMount } from 'svelte'
	onMount(() => {
		// Runs on the client after the component renders

		return () => {
			// `onMount` cleanup
			// Runs when the component is destroyed
		}
	})

	$effect(() => {
		// Runs on the client after render is complete
		// will rerun on state changes

		return () => {
			// `$effect` cleanup
			// Runes when the component is destroy or states changed
		}
	})
</script>

<!-- This area is called `markup` -->

<!-- element -->
<input
	// attribute (Yes, this comment is valid syntax)
	type="input"
/>

<!-- components -->
<Component
	// prop
	foo={bar}
/>
<obj.component />

<style>
	/* This area is called `style block` */
</style>
```
