---
title: Test Mixed Code Group
description: Testing both inline and imported code in the same code-group
date: '2025-01-31'
categories:
  - sveltekit
  - svelte
published: true
---

## Testing Mixed Code Group

This is a test of the extended `:::code-group` syntax that supports both imported files and inline code blocks.

:::code-group
<<< ./counter.svelte [Imported Counter]

```svelte [Inline Button]
<script>
	let clicked = false
</script>

<button onclick={() => clicked = true}>
	{clicked ? 'Clicked!' : 'Click me'}
</button>
```

```javascript [Inline JS]
console.log('This is inline JavaScript code');
function greet(name) {
	return `Hello, ${name}!`;
}
```
:::

## Testing Pure Inline Code Group

This should work with only inline code blocks:

:::code-group
```css [Inline CSS]
.button {
	background: blue;
	color: white;
	padding: 8px 16px;
	border: none;
	border-radius: 4px;
}
```

```html [Inline HTML]
<div class="container">
	<h1>Hello World</h1>
	<p>This is a paragraph.</p>
</div>
```
:::

## Regular Code Block (for comparison)

```js
console.log('This is a regular code block, not in a group');
```

## Existing Import-Only Code Group (Should still work)

:::code-group
<<< ./counter.svelte [Counter Component]
:::