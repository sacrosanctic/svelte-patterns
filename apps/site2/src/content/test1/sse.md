---
title: Server-Sent Events (SSE)
description: Learn how to implement real-time updates using Server-Sent Events in SvelteKit
---

## Describe The Problem

If you need **real-time updates** — like live notifications, feed updates, or progress events — but don't want the complexity of WebSockets or the overhead of polling, **SSE** offers a simpler, browser-native solution over standard HTTP connections.

## Solution

**routes/+page.svelte:**
```svelte
<!-- Client-side SSE implementation -->
```

**routes/sse/+server.js:**
```js
// Server-side SSE endpoint implementation
```

**Interactive Example - See source code in ./how-to-sse/+page.svelte and ./how-to-sse/sse-+server.js**

## Reference

- [additional examples on Github](https://github.com/sveltejs/kit/issues/5344)
- [Sveltekit-SSE](https://github.com/razshare/sveltekit-sse)
