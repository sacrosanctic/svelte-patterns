---
title: Props Down Events Up
category: concept
tags: reactivity
---

# Props Down Events Up

"Props Down, Events Up" is a fundamental pattern for managing state between components. This ensure's reactivity is one way and the ownership of the state is with the parent.

- Props Down: The parent passes the reactive state to the child via props.
- Events Up: The child emits an event to notify the parent, which then updates the reactive state.

The following code demonstrates how button never interacts with the `$state` directly.

:::svelte-repl
<<< ./App.svelte
<<< ./Button.svelte
:::

## Reference

- https://svelte.dev/docs/svelte/bind
- https://svelte.dev/docs/svelte/$bindable
- https://svelte.dev/docs/svelte/$props#Updating-props
