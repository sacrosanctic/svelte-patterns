---
title: How To Make Infinite Scroll
publish: false
tags:
---

## Disclaimer

Infinite scroll is historically really hard to make work. It is recommended to use pagination instead. With that said, if you're still interested, push on ahead.

- [So you think you built good infinite](https://adrianroselli.com/2014/05/so-you-think-you-built-good-infinite.html)

## Via Load Function

:::sveltelab-repl
<<< ./+page.svelte [src/routes/+page.svelte]
<<< ./+page.server.js [src/routes/+page.server.js]
<<< ./InfiniteList.svelte [src/routes/InfiniteList.svelte]
<<< ./db.js [src/routes/db.js]
:::

## Via API endpoint

TODO, its the same as load fn, but replace `<a>` and `goto` with `fetch`.

## References

- https://github.com/rodshtein/sveltekit-demo--Infinity--scroll-navigation
