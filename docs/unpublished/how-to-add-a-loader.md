# How To Add A Loader

```svelte
<script>
	import { enhance } from '$app/forms'
	let sending = false
</script>

<form
	method="POST"
	use:enhance={({ cancel }) => {
		if (sending) return cancel()
		sending = true

		return ({ update }) => {
			update().finally(() => (sending = false))
		}
	}}
>
	...
</form>
```

https://snippets.khromov.se/add-a-loading-indicator-to-a-form-action-in-sveltekit/
