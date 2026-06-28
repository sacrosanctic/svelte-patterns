---
title: Component Export
category: concept
---

# Component Export

```svelte
<script>
	export { foo }
</script>
```

This is the imparative interface of the component (as opposed to its declarative counterart `$props`).

# Usage

:::svelte-repl
<<< ./App.svelte
<<< ./Button.svelte
:::

The equivalent with `$props` values or callbacks would be far more difficult. This feature is a catch-all and should be used sparingly. Primarily focused on side effects and non-$state changes.
