---
title: How To Get Types For use:enhance
tags: typescript, form
---

:::code-group

```svelte [routes/+page.svelte]
<script lang="ts">
	import type { SubmitFunction } from './$types' // [!code ++]

	const submitFunction = () => { // [!code --]
	const submitFunction: SubmitFunction = () => { // [!code ++]
		return ({ result }) => {
			if (result.type === 'success') {
				result.data // typed // [!code ++]
			}
			if (result.type === 'failure') {
				result.data // typed // [!code ++]
			}
		}
	}
</script>

<form use:enhance={submitFunction}>...</form>
```

:::

- https://github.com/sveltejs/kit/issues/7161#issuecomment-1925796822
