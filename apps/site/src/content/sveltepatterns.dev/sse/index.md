---
title: Server-Sent Events (SSE)
category: concept
---

## Describe the Problem

If you need **real-time updates** — like live notifications, feed updates, or progress events — but don't want the complexity of WebSockets or the overhead of polling, **SSE** offers a simpler, browser-native solution over standard HTTP connections.

:::sveltelab-repl
<<< ./+page.svelte [src/routes/+page.svelte]
<<< ./sse-+s.js [src/routes/sse/+server.js]
:::

## Reference

- [additional examples on Github](https://github.com/sveltejs/kit/issues/5344)
- [Sveltekit-SSE](https://github.com/razshare/sveltekit-sse)
