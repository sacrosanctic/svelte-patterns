---
title: How to Clean Up During HMR
publish: true
tags: svelte, vite, hmr, dev
---

## Describe the problem

During development, resources that don't have a built-in cleanup mechanism can persist during Hot Module Replacement (HMR). This can lead to resource leaks or unexpected behavior as new instances are created while old ones are not destroyed.

This applies to things like:

- Database connections
- Web socket connections
- Intervals and timeouts (`setInterval`, `setTimeout`)
- Third-party library instances that require a `destroy` or `disconnect` method.

## Solution

In the file where you establish the connection, add the following code:

```svelte
<script>
	import { onMount } from 'svelte'

	// Group cleanup together
	const cleanup = () => {
		socket?.close()
		db?.close()
		clearInterval(timer)
	}

	// Initialize your resources
	const socket = new WebSocket('ws://localhost:8080')
	const db = await createConnection()
	const timer = setInterval(() => {}, 1000)

	onMount(() => {
		// do setup
		// ...

		// do component cleanup
		return () => cleanup()
	})

	// do HMR cleanup
	if (import.meta.hot) {
		import.meta.hot.on('vite:beforeUpdate', () => cleanup())
	}
</script>
```

## Reference

- [Vite HMR API](https://vite.dev/guide/api-hmr.html)
