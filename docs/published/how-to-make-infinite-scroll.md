---
title: How To Make Infinite Scroll
publish: false
tags:
---

<script setup>
import SveltelabRepl from '../../Sveltelab.vue'
import A from './how-to-make-infinite-scroll/+page.server.js?raw'
import B from './how-to-make-infinite-scroll/+page.svelte?raw'
import C from './how-to-make-infinite-scroll/db.js?raw'
import D from './how-to-make-infinite-scroll/InfiniteList.svelte?raw'
</script>

## Disclaimer

Infinite scroll is historically really hard to make work. It is recommended to use pagination instead. With that said, if you're still interested, push on ahead.

- [So you think you built good infinite](https://adrianroselli.com/2014/05/so-you-think-you-built-good-infinite.html)

## Via Load Function

:::code-group

<<< ./how-to-make-infinite-scroll/+page.svelte
<<< ./how-to-make-infinite-scroll/+page.server.js
<<< ./how-to-make-infinite-scroll/InfiniteList.svelte
<<< ./how-to-make-infinite-scroll/db.js

:::

<SveltelabRepl :files="[
{contents: A ,name:'src/routes/+page.server.js'},
{contents: B ,name:'src/routes/+page.svelte',},
{contents: C ,name:'src/routes/db.js',},
{contents: D ,name:'src/routes/InfiniteList.svelte',},
]" />

## Via API endpoint

TODO, its the same as load fn, but replace `<a>` and `goto` with `fetch`.
