---
title: Polyfill
category: concept
---

# Polyfill

This demonstrates how to setup polyfill for future API's like `Temporal`. Do note that this will block rendering until the js is loaded. Another point to consider is to vendor the file instead of relying on a CDN like `jsdelivr`.

https://npmx.dev/package/temporal-polyfill/v/0.3.1
https://cdn.jsdelivr.net/npm/temporal-polyfill@0.3.1/global.min.js

## Svelte

:::svelte-repl
<<< ./App.svelte
<<< ./Polyfill.svelte
:::
