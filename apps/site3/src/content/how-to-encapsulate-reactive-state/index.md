# How To Encapsulate Reactive State

`Standalone` State is scoped within a single `*.svelte` file.

`Direct tree` State is owned by the top-most parent and is scoped to itself and its descendants, with a one-way data flow from parent to child.

`Global` State is not owned by anyone one file, and data communication is undirected.

One way to look at these options is to say who owns the data, `Standalone` is the file itself, `Direct` is the top most parent. `Indirect` is undefined.

## Standalone

:::svelte-repl

<<< ./standalone-app.svelte [App.svelte]

:::

## Action

:::svelte-repl

<<< ./action-app.svelte [App.svelte]

:::

## Directed tree (graph)

### Props

:::svelte-repl

<<< ./parent-child-app.svelte [App.svelte]

<<< ./parent-child-child.svelte [Child.svelte]

:::

### Prop Drilling

:::svelte-repl

<<< ./parent-grandchild-app.svelte [App.svelte]

<<< ./parent-grandchild-child.svelte [Child.svelte]

<<< ./parent-grandchild-grandchild.svelte [Grandchild.svelte]

:::

### Load Function

### Context Api

<!--
::: code-group

<<< ./contextapi-app.svelte [App.svelte]

<<< ./contextapi-child.svelte [Child.svelte]

<<< ./contextapi-grandchild.svelte [Grandchild.svelte]

:::

<SvelteRepl name="Hello world (edited)" :files="[
	{
		name:'App.svelte',
		contents:Asdf7,
	},
	{
		name:'Child.svelte',
		contents:Asdf8,
	},
	{
		name:'Grandchild.svelte',
		contents:Asdf9,
	},
]" /> -->

### Class

## Global

### Class

### Function

### Object

### JS Module

:::svelte-repl

<<< ./jsmodule-app.svelte [App.svelte]

<<< ./jsmodule-external.svelte.js [external.svelte.js]

:::
