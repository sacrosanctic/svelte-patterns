# Anti Patterns

## Intermediate variables

This causes more harm than good since its breaks the reactivity chain obscures the source of the data

```svelte
<script>
	let count = $state({ foo: 1 })
	let foo = count.foo // [!code --]
</script>

{foo} // [!code --]
{count.foo} // [!code ++]
```

## Destructuring

This causes more harm than good since its breaks the reactivity chain obscures the source of the data

```svelte
<script>
	let count = $state({ foo: 1 })
	let { foo } = count // [!code --]
</script>

{foo} // [!code --]
{count.foo} // [!code ++]
```
