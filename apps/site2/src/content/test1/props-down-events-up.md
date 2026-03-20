---
title: Props Down Events Up
description: Understanding the fundamental pattern of data flow in Svelte applications
---

"Props Down, Events Up" is a fundamental pattern for managing data flow between components, ensuring that the parent, as the owner of reactive state, is the only component responsible for modifying it:

- Props Down: The parent passes reactive state to child via props.
- Events Up: The child emits an event to notify the parent, which then updates reactive state.

## Basic Example

**Parent.svelte:**
```svelte
<script>
  let count = $state(0)
  
  const increment = () => {
    count += 1
  }
</script>

<Child {value={count} {onclick={increment} />
```

**Child.svelte:**
```svelte
<script>
  let { value, onclick } = $props()
</script>

<button onclick={() => onclick(value)}>
  Count: {value}
</button>
```

## Why This Pattern Works

1. **Single Source of Truth**: The parent owns the state
2. **Unidirectional Data Flow**: Props flow down, events flow up
3. **Encapsulation**: Child components don't mutate parent state directly
4. **Predictability**: Easy to track where state changes originate
5. **Testability**: Clear data flow makes components easier to test

## Benefits

- **Maintainable**: Clear ownership of state
- **Debuggable**: Easy to trace state changes
- **Reusable**: Child components are more generic
- **Scalable**: Pattern works for complex component hierarchies

**Interactive Example - See source code in ./props-down-events-up/App.svelte and ./props-down-events-up/Button.svelte**