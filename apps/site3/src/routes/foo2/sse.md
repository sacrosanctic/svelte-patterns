---
title: Server-Sent Events (SSE)
publish: false
tags:
---

## Describe the Problem

If you need **real-time updates** — like live notifications, feed updates, or progress events — but don't want the complexity of WebSockets or the overhead of polling, **SSE** offers a simpler, browser-native solution over standard HTTP connections.

:::svelte-repl
<<< ./how-to-sse/+page.svelte [routes/+page.svelte]
<<< ./how-to-sse/sse-+server.js [routes/sse/+server.js]

```js
console.log('asdf')
```

```js [idk.js]
console.log('idk')
```

:::

## Reference

- [additional examples on Github](https://github.com/sveltejs/kit/issues/5344)
- [Sveltekit-SSE](https://github.com/razshare/sveltekit-sse)
