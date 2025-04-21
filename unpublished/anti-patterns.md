# Anti Patterns

## bundled components (aka barrel files)

Bundler struggle with optimizing for Svelte components being put in 1 JS module and Vite struggles to analyize them

- https://svelte.dev/docs/kit/icons#Svelte
- https://ivicabatinic.from.hr/posts/multipart-namespace-components-addressing-rsc-and-dot-notation-issues#update-insights-on-bundler-limitations-with-dot-notation
- https://vite.dev/guide/performance#avoid-barrel-files

#### Do not do this

```svelte
<Component.Root>
	<Component.Child></Component.Child>
</Component.Root>
```

#### Do this instead

```svelte
<Root>
	<Child></Child>
</Root>
```

or

```svelte
<Root>
	{#snippet child()}
		...
	{/snippet}
</Root>
```

## Global
