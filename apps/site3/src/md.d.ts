// allows for .md import as svelte files

declare module '*.md' {
	import type { Component } from 'svelte'
	const component: Component
	export default component
}
