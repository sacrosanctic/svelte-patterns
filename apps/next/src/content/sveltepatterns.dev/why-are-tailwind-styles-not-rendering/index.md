---
title: Why Are Tailwind Styles Not Rendering
category: faq
tags: tailwind, css
---

## Describe The Problem

Tailwind statically analyses your app for tailwind classes and only looks for complete class names. [src](https://tailwindcss.com/docs/detecting-classes-in-source-files#dynamic-class-names)

So code like this will not work.

```svelte
<button class="bg-{toggle ? 'blue' : 'red'}-500">click me!</button>
```

```svelte
<div class="opacity-[{value}%]">Hi</div>
```

## Use Static Class Names

```svelte
<script>
	let toggle = $state(false)
</script>

<button class={[toggle ? 'bg-blue-500' : 'bg-red-500']} onclick={() => (toggle = !toggle)}>
	click me!
</button>
```

## Use CSS variable

```svelte
<script>
	let value = $state(20)
</script>

<div style="--opacity:{value}%" class="opacity-(--opacity)">Hi</div>
<input type="range" bind:value />{value}

<style lang="postcss">
	h1 {
		@apply mb-2 text-xl font-bold;
	}
</style>
```

## Use Vanilla CSS

:::svelte-repl
<<< ./App.svelte
:::
