---
title: Reactivity
category: concept
---

We're going to demonstrate reactivity by implementing a tri-state checkbox. In your mental model, think about `UI` and `logic` as the 2 core pieces we're workthing with.

# vanilla javascript

For comparison purposes. Let's start off with vanilla Javascript.

:::svelte-repl

<<<./vanilla.svelte [App.svelte]

:::

The only svelte syntax this code uses is the [`onclick`](https://svelte.dev/docs/svelte/basic-markup#Events.) (only because true vanilla doesn't render in the REPL).

# inlined to component

:::svelte-repl

<<<./inlined.svelte [App.svelte]

:::

Here we take our first step into svelte's reactivity. `onclick` is now only responsible for increamenting the `index` while reactivty ensures the DOM is up to date.

For inlined reactivty, Svelte's does you a favor and remove the need to use a closure. This is the most common way to write reactivity.

:::svelte-repl

<<<./inlined2.svelte [App.svelte]

:::

# detached

The reactive logic is seperated from the UI can can be reused.

:::svelte-repl

<<<./detached.svelte [App.svelte]

:::

# `@attach`
