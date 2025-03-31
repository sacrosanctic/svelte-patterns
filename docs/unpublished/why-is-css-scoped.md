---
title: Why Is Css Scoped
publish: false
tags:
---

## Describe the problem

> CSS encapsulation is a critical feature of single file components in Svelte; it allows you to think only about the styles that live together in a given component. Managing CSS has long been one of the more challenging aspects of building for the web; we have no desire to bring those problems back via official APIs that encourage the de-scoping of CSS. We do not wish to revisit the age of namespaced CSS selectors and required preprocessors.
> &mdash; <cite>[pngwn][1]</cite>

[1]: https://github.com/sveltejs/rfcs/pull/22#issuecomment-664047806

## Recommended

### Component Styles

:::code-group

```svelte [App.svelte]
<script>
	import Box from './Box.svelte'
</script>

<div class="boxes">
	<Box --color="red" />
	<Box --color="green" />
	<Box --color="blue" />
</div>
```

```svelte [Box.svelte]
<div class="box"></div>

<style>
	.box {
		background-color: var(--color, #ddd);
	}
</style>
```

- https://svelte.dev/tutorial/svelte/component-styles

:::

## How to get around it

### Single Selector

```svelte
<style>
	div :global(strong) {
		/* applies to all <strong> elements, in any component,
		   that are inside <div> elements belonging
		   to this component */
		color: goldenrod;
	}
</style>
```

https://svelte.dev/docs/svelte/global-styles#:global()

### Group of Selectors

```svelte
<style>
	:global {
		/* applies to every <div> in your application */
		div {
			color: red;
		}

		/* applies to every <p> in your application */
		p {
			color: red;
		}
	}

	.a :global {
		/* applies to every `.b .c .d` element, in any component,
		   that is inside an `.a` element in this component */
		.b .c .d {
			color: red;
		}
	}
</style>
```

https://svelte.dev/docs/svelte/global-styles#:global()

### Whole Stylesheet (inline)

```svelte
<style global>
	div {
		color: red;
	}
</style>
```

https://github.com/sveltejs/svelte-preprocess?tab=readme-ov-file#global-style

### Whole Stylesheet (external)

:::code-group

```css [src/app.css]
div {
	color: red;
}
```

```svelte [src/routes/+layout.svelte]
<script>
	import '../app.css'
</script>
```

:::

## Reference
