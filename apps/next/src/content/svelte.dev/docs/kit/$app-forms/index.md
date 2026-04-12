# enhance

## Typed enhance function

:::code-group

```svelte [routes/+page.svelte]
<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit' // [!code --]
	import type { SubmitFunction } from './$types' // [!code ++]

	const submitFunction: SubmitFunction = () => {
		return ({ result }) => {
			if (result.type === 'success') {
				result.data // typed
			}
			if (result.type === 'failure') {
				result.data // typed
			}
		}
	}
</script>

<form use:enhance={submitFunction}>...</form>
```

:::

- https://github.com/sveltejs/kit/issues/7161#issuecomment-1925796822
