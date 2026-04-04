---
title: Conditional Streaming
publish: false
tags:
---

<script setup>
import SveltelabRepl from '../../Sveltelab.vue'
import A from './ssr-routes-+page.server.js?raw'
import B from './ssr-routes-+page.svelte?raw'
import C from './ssr-routes-+layout.svelte?raw'
import D from './ssr-routes-about-+page.svelte?raw'
import E from './loader-routes-about-+page.server.js?raw'
import F from './loader-routes-+page.svelte?raw'
import H from './loader-routes-about-+page.svelte?raw'
</script>

## For SSR

This returns either `data` for SSR or a promise of `data` for CSR.

:::code-group

<<< ./ssr-routes-+page.server.js [routes/+page.server.js]
<<< ./ssr-routes-+page.svelte [routes/+page.svelte]

:::

<SveltelabRepl :files="[
{contents: A ,name:'src/routes/+page.server.js',},
{contents: B ,name:'src/routes/+page.svelte',},
{contents: C ,name:'src/routes/+layout.svelte',},
{contents: D ,name:'src/routes/about/+page.svelte',},
]" />

## For Loading Indicator

Used to display a loading indicator only when the data is slow.

:::code-group

<<< ./loader-routes-about-+page.server.js [+page.server.js]
<<< ./loader-routes-about-+page.svelte [+page.svelte]
:::
<SveltelabRepl :files="[
{contents: E ,name:'src/routes/about/+page.server.js',},
{contents: F ,name:'src/routes/+page.svelte',},
{contents: H ,name:'src/routes/about/+page.svelte',},
]" />

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
