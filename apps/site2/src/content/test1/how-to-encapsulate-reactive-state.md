---
title: How To Encapsulate Reactive State  
description: Learn different patterns for managing reactive state in Svelte applications
---

# How To Encapsulate Reactive State

`Standalone` State is scoped within a single `*.svelte` file.

`Direct tree` State is owned by the top-most parent and is scoped to itself and its descendants, with a one-way data flow from parent to child.

`Global` State is not owned by anyone one file, and data communication is undirected.

One way to look at these options is to say who owns the data, `Standalone` is the file itself, `Direct` is the top most parent. `Indirect` is undefined.

## Different Patterns

- **Standalone**: State is contained within a single component
- **Parent-Child**: State flows from parent to child components  
- **Context API**: State is shared through Svelte's context system
- **JS Modules**: State is managed through external JavaScript modules
- **Actions**: State is managed through Svelte actions

## Implementation Examples

### Standalone State
**App.svelte:**
```svelte
<script>
  let count = $state(0)
</script>

<button onclick={() => count++}>
  Count: {count}
</button>
```

### Parent-Child Pattern
**Parent.svelte:**
```svelte
<script>
  let data = $state('Hello from parent')
</script>

<Child message={data} />
```

**Child.svelte:**
```svelte
<script>
  let { message } = $props()
</script>

<p>{message}</p>
```

### Context API
**App.svelte:**
```svelte
<script>
  import { setContext } from 'svelte'
  
  setContext('theme', 'dark')
</script>
```

**Child.svelte:**
```svelte
<script>
  import { getContext } from 'svelte'
  
  const theme = getContext('theme')
</script>

<p>Current theme: {theme}</p>
```

**Interactive Examples - See source code in ./how-do-i-use-reactive-state/ directory**