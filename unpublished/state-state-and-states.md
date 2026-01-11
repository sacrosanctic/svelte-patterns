---
title: State, State, And States
publish: false
tags:
---

shared-stated.md
why-globals-suck.md
how-to-encapsulate-reactive-state.md

## There are so many, How do I choose?

<!-- screenshot to  -->

With the introduction of Runes in Svelte 5, the way we manage state has become more explicit and powerful. However, it can be confusing to know which tool to use for which job. Let's break down the different kinds of state and when to use them.

The core of Svelte's new reactivity model can be summarized with this matrix, which categorizes state based on two axes: whether it's a **source** or a **derivation**, and whether it's **proxied** or not.

|                 | Deeply Reactive                                                                     | Shallow Reactive            |
| :-------------- | :---------------------------------------------------------------------------------- | :-------------------------- |
| **Sources**     | `$state`                                                                            | `$state.raw`                |
| **Derivations** | `$derived.by($state)`<br>[See issue](https://github.com/sveltejs/svelte/pull/17308) | `$derived`<br>`$derived.by` |

### Sources

This is the "raw" data that you introduce into your application. It's the fundamental building block to the reactivity system. It's data that other parts of your application will react to.

### Derivations (without side effects)

This is state that is calculated from source state. It's a reaction to changes in your source state.

:::info Note
$derived and $derived.by arent technically, shallow they're a passthrough so they're whatever the source.
:::

<!-- link to what svelte promises -->

### Types of reactivity

- **Deeply reactive**:
- **Shallow reactive**:

- **Fine-grain reactive**:
- **Coarse-grain reactive**:

:::info Note
Essentially, deeply reactive values are wrapped in a proxy
:::

### Derivations (with side effects)

<!-- link to there are many effects -->

### Async

$effect and friends - side effect and async
$state.eager - for async
$derived(await ...)

## Misc

### `$state.snapshot`

think of it as an export fn to an external \_\_\_\_. This is useful when you want to pass state to a non-Svelte part of your application (like a third-party library)

### $props

- not really for reactivity

### $bindable

- this is for 2 way linking between 2 components
