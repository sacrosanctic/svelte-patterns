---
title: Anatomy of a Svelte Component
category: concept
tags: anatomy of, cheatsheet
---

# Anatomy of a Svelte Component

This article highlights the different parts of a svelte component. What they're called, and their main purpose.

A svelte component has 6 parts.

- component doc
- svelte options elements
- script module block (aka script module)
- script block
- markup
- style block

```svelte
<!-- This is called a `component docs` -->
<!--
@component
  Things about the component goes here.
-->

<!-- This is a svelte options element -->
<svelte:options option={value} />

<!-- This is called a `script module block` -->
<script module>
	// The code here is singleton
	// Runs twice no matter how many times you use this component, once on the server and once on the client
</script>

<!-- This is called a `script block` -->

<!--
	`lang="ts"` enables typescript (is this valid syntax?)
	`generic="T"` A component is a function and can accept TS generics
 -->
<script lang="ts" generic="T">
	import { browser } from '$app/environment'

  // component props (aka component input API)
	let { a, b, c } = $props()

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

  // component exports (aka component output API)
	function foo() {}
	export { foo }
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

<!-- This area is called `style block` -->
<style>
	.cool-style {
		// ...
	}
</style>
```
