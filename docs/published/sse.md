---
title: Server-Sent Events (SSE)
publish: false
tags:
---

## Describe the Problem

If you need **real-time updates** — like live notifications, feed updates, or progress events — but don't want the complexity of WebSockets or the overhead of polling, **SSE** offers a simpler, browser-native solution over standard HTTP connections.

<script setup>
import SveltelabRepl from '../../Sveltelab.vue'
import A from './how-to-sse/+page.svelte?raw'
import B from './how-to-sse/sse-+server.js?raw'
</script>

:::code-group
<<< ./how-to-sse/+page.svelte [routes/+page.svelte]
<<< ./how-to-sse/sse-+server.js [routes/sse/+server.js]
:::

<SveltelabRepl :files="[
{contents: A ,name:'src/routes/+page.svelte',},
{contents: B ,name:'src/routes/sse/+server.js',},
]" />

## Reference

- [additional examples on Github](https://github.com/sveltejs/kit/issues/5344)
- [Sveltekit-SSE](https://github.com/razshare/sveltekit-sse)
