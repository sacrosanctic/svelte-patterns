---
title: How To Reset The Root Layout
---

<script setup>
import SveltelabRepl from '../../Sveltelab.vue'
import A from  './how-to-reset-the-root-layout/routes-(hasHeader)-+layout.svelte?raw'
import B from  './how-to-reset-the-root-layout/routes-(hasHeader)-about-+page.svelte?raw'
import D from  './how-to-reset-the-root-layout/routes-+page.svelte?raw'
import E from  './how-to-reset-the-root-layout/routes-+layout.svelte?raw'
</script>

## Describe the problem

The root layout is applied globally to all pages, meaning every route inherits from it by default. This can be problematic when you want certain pages to have a completely different layout. [Resetting](https://svelte.dev/docs/kit/advanced-routing#Advanced-layouts-Breaking-out-of-layouts) is not an option since there isn't any level above the root layout to break out to.

```js
/routes
├── +layout.svelte // has header
├── +page.svelte // don't want header on the frontpage
└── /about
    └── +page.svelte // do want header on the about page
```

## Use layout groups

Create two [layout groups](<https://svelte.dev/docs/kit/advanced-routing#Advanced-layouts-(group)>). One with a header and one without.

```js
/routes
├── +page.svelte
└── /(hasHeader)
    ├── +layout.svelte
    └── /about
        └── +page.svelte
```

:::code-group

<SveltelabRepl :files="[
{contents: A , name:'src/routes/(hasHeader)/+layout.svelte'},
{contents: B , name:'src/routes/(hasHeader)/about/+page.svelte'},
{contents: D , name:'src/routes/+page.svelte'},
{contents: E , name:'src/routes/+layout.svelte'},
]" />
