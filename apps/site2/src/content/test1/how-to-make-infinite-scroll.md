---
title: How To Make Infinite Scroll
description: Learn different approaches to implement infinite scroll functionality in SvelteKit applications
---

## Disclaimer

Infinite scroll is historically really hard to make work. It is recommended to use pagination instead. With that said, if you're still interested, push on ahead.

- [So you think you built good infinite](https://adrianroselli.com/2014/05/so-you-think-you-built-good-infinite.html)

## Via Load Function

**+page.svelte:**
```svelte
<!-- Page component with infinite scroll -->
```

**+page.server.js:**
```js
// Server-side load function for data fetching
```

**InfiniteList.svelte:**
```svelte
<!-- Infinite scroll list component -->
```

**db.js:**
```js
// Mock database with sample data
```

**Interactive Example - See source code in respective files**

## Via API endpoint

TODO, its the same as load fn, but replace `<a>` and `goto` with `fetch`.

## References

- https://github.com/rodshtein/sveltekit-demo--Infinity--scroll-navigation
