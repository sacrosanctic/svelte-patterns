---
title: Conditional Streaming
description: Learn how to conditionally stream data in SvelteKit for SSR and CSR scenarios
---

## For SSR

This returns either `data` for SSR or a promise of `data` for CSR.

**routes/+page.server.js:**
```js
// Implementation for SSR
```

**routes/+page.svelte:**
```svelte
<!-- Implementation for SSR -->
```

**routes/+layout.svelte:**
```svelte
<!-- Layout implementation -->
```

**Interactive Example - See source code above for implementation details**

## For Loading Indicator

Used to display a loading indicator only when the data is slow.

**About page (+page.server.js):**
```js
// Loader implementation for about page
```

**About page (+page.svelte):**
```svelte
<!-- About page implementation -->
```

**Interactive Example - See source code above for implementation details**

<!--
cant seem to make this work
 export const load = async () => {
	return {
		slow: await resolveBy(getSlowData, 200),
	}
}

const resolveBy = async (promise, ms) => {
	const result = await Promise.race([delay(ms), promise])
	return result ?? promise
} -->

## Reference

- https://geoffrich.net/posts/conditionally-stream-data/
- https://khromov.se/sveltekit-streaming-the-complete-guide/
