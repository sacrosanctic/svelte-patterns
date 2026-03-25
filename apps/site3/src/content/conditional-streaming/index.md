---
title: Conditional Streaming
publish: false
tags:
---

## For SSR

This returns either `data` for SSR or a promise of `data` for CSR.

:::sveltelab-repl
<<< ./ssr-routes-+page.server.js [src/routes/+page.server.js]
<<< ./ssr-routes-+page.svelte [src/routes/+page.svelte]
<<< ./ssr-routes-+layout.svelte [src/routes/+layout.svelte]
<<< ./ssr-routes-about-+page.svelte [src/routes/about/+page.svelte]
:::

## For Loading Indicator

Used to display a loading indicator only when the data is slow.

<!-- exception -->
<!-- :::sveltelab-repl
<<< ./loader-routes-about-+page.server.js [src/routes/about/+page.server.js]
<<< ./loader-routes-about-+page.svelte [src/routes/about/+page.svelte]
<<< ./loader-routes-+page.svelte [src/routes/+page.svelte]
::: -->

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
