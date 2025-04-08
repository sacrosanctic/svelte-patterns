---
title: What Are Some Common Mistakes
---

In svelte 4, you had to do this.

```svelte
<script>
	let arr = [0, 1]

	function handleClick() {
		arr.push(2)
		arr = arr // [!code highlight]
	}
</script>
```

> https://v4.svelte.dev/docs/svelte-components#script-2-assignments-are-reactive

It was unintuitive that you had to reassign arrays and objects to trigger reactivity. Svelte 5 also has its own set of unintuitive patterns. Here, I will attempt to document them.

## Destructuring breaks reactivity

```svelte
<script>
	let { data } = $props()
	const { foo } = data // [!code --]
	const { foo } = $derived(data) // [!code ++]
</script>

{foo}
```

In JavaScript, [destructured declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) are evaluated at the time of destructuring. <a href="https://github.com/sveltejs/svelte/issues/11911#issuecomment-2195478261"><Badge type="tip" text="src" />
</a>

## Intermediate variables break reactivity

```svelte
<script>
	let { data } = $props()
	const foo = data.foo // [!code --]
	const foo = $derived(data.foo) // [!code ++]
</script>

{foo}
```

## $state(data) will not receive upstream updates

```svelte
<script>
	let { data } = $props()
	const foo = $state(data.foo) // [!code --]
	const foo = $derived(data.foo) // [!code ++]
</script>

{foo}
```

## Exporting $state primative from a module is immutable

````js
//util.svelte.js
export const value = $state(5) // [!code --]
export const value = $state({current:5}) // [!code ++]
```


## Direct DOM maniputation will desync the Svelte's runtime

```svelte
<script>
	const input = document.getElementById('id') // [!code --]
	let input // [!code ++]
</script>

<input id="id" /> // [!code --]
<input bind:this={input} /> // [!code ++]
```

```svelte
<script>
	const handler = () => console.log('Boo!')

	const input = document.getElementById('button') // [!code --]
	button.addEventListener('click', handler) // [!code --]
</script>

<button id="button">click to see</button> // [!code --]
<button onclick={handler}>click to see<button> // [!code ++]
```

```svelte
<script>
	let value = $state(0)
</script>

<button onclick={(e) => (e.currentTarget.innerHTML = 4)}>{value}</button> // [!code --]
<button onclick={(e) => (value = 4)}>{value}</button> // [!code ++]
```
````
