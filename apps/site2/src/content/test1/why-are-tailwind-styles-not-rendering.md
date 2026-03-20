---
title: Why Are Tailwind Styles Not Rendering
description: Understand why Tailwind CSS classes might not render and learn how to fix common issues
---

## Describe The Problem

Tailwind statically analyses your app for tailwind classes and only looks for complete class names. [See Tailwind docs](https://tailwindcss.com/docs/detecting-classes-in-source-files#dynamic-class-names).

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

<button
	class={[
		'text-white rounded-lg px-5 py-2.5',
		toggle ? 'bg-blue-500' : 'bg-red-500', // [!code highlight]
	]}
	onclick={() => (toggle = !toggle)}
>
	click me!
</button>
```

<!-- Demo -->

## Use CSS variable

```svelte {5}
<script>
	let value = $state(20)
</script>

<div style="--opacity:{value}%" class="opacity-[var(--opacity)]">Hi</div>
<input type="range" bind:value />{value}

<style lang="postcss">
	h1 {
		@apply mb-2 text-xl font-bold;
	}
</style>
```

## Use Vanilla CSS

**A.svelte:**
```svelte
<script>
  let value = $state(20)
</script>

<div style="opacity:{value / 100}">Hi</div>
<input type="range" bind:value />
```

**Interactive Example - See source code above for implementation details**
