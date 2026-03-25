---
title: Props Down Events Up
tags: concept
---

"Props Down, Events Up" is a fundamental pattern for managing data flow between components, ensuring that the parent, as the owner of the reactive state, is the only component responsible for modifying it:

- Props Down: The parent passes the reactive state to the child via props.
- Events Up: The child emits an event to notify the parent, which then updates the reactive state.

:::svelte-repl
<<< ./App.svelte [App.svelte]
<<< ./Button.svelte [Button.svelte]
:::

## Reference

- https://svelte.dev/docs/svelte/bind
- https://svelte.dev/docs/svelte/$bindable
- https://svelte.dev/docs/svelte/$props#Updating-props
