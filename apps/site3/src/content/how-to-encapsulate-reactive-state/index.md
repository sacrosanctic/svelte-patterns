<script setup>
import SvelteRepl from '../../Svelte.vue'
import Asdf from './standalone-app.svelte?raw'
import Asdf2 from './parent-child-app.svelte?raw'
import Asdf3 from './parent-child-child.svelte?raw'
import Asdf4 from './parent-grandchild-app.svelte?raw'
import Asdf5 from './parent-grandchild-child.svelte?raw'
import Asdf6 from './parent-grandchild-grandchild.svelte?raw'
import Asdf7 from './contextapi-app.svelte?raw'
import Asdf8 from './contextapi-child.svelte?raw'
import Asdf9 from './contextapi-grandchild.svelte?raw'
import Asdf10 from './jsmodule-app.svelte?raw'
import Asdf11 from './jsmodule-external.svelte.js?raw'
import Asdf12 from './action-app.svelte?raw'
</script>

# How To Encapsulate Reactive State

`Standalone` State is scoped within a single `*.svelte` file.

`Direct tree` State is owned by the top-most parent and is scoped to itself and its descendants, with a one-way data flow from parent to child.

`Global` State is not owned by anyone one file, and data communication is undirected.

One way to look at these options is to say who owns the data, `Standalone` is the file itself, `Direct` is the top most parent. `Indirect` is undefined.

## Standalone

::: code-group

<<< ./standalone-app.svelte [App.svelte]

:::

<SvelteRepl name="Hello world (edited)" :files="[
	{
		name:'App.svelte',
		contents:Asdf,
	}
]" />

## Action

::: code-group

<<< ./action-app.svelte [App.svelte]

:::

<SvelteRepl name="Hello world (edited)" :files="[
	{
		name:'App.svelte',
		contents:Asdf12,
	}
]" />

## Directed tree (graph)

### Props

::: code-group

<<< ./parent-child-app.svelte [App.svelte]

<<< ./parent-child-child.svelte [Child.svelte]

:::

<SvelteRepl name="Hello world (edited)" :files="[
	{
		name:'App.svelte',
		contents:Asdf2,
	},
	{
		name:'Child.svelte',
		contents:Asdf3,
	},
]" />

### Prop Drilling

::: code-group

<<< ./parent-grandchild-app.svelte [App.svelte]

<<< ./parent-grandchild-child.svelte [Child.svelte]

<<< ./parent-grandchild-grandchild.svelte [Grandchild.svelte]

:::

<SvelteRepl name="Hello world (edited)" :files="[
	{
		name:'App.svelte',
		contents:Asdf4,
	},
	{
		name:'Child.svelte',
		contents:Asdf5,
	},
	{
		name:'Grandchild.svelte',
		contents:Asdf6,
	},
]" />

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

::: code-group

<<< ./jsmodule-app.svelte [App.svelte]

<<< ./jsmodule-external.svelte.js [external.svelte.js]

:::

<SvelteRepl name="Hello world (edited)" :files="[
	{
		name:'App.svelte',
		contents:Asdf10,
	},
	{
		name:'external.svelte.js',
		contents:Asdf11,
	},
]" />
