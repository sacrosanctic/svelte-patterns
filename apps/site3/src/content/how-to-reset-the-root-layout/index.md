---
title: How To Reset The Root Layout
---

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

:::sveltelab-repl
<<< ./routes-(hasHeader)-+layout.svelte [src/routes/(hasHeader)/+layout.svelte]
<<< ./routes-(hasHeader)-about-+page.svelte [src/routes/(hasHeader)/about/+page.svelte]
<<< ./routes-+page.svelte [src/routes/+page.svelte]
<<< ./routes-+layout.svelte [src/routes/+layout.svelte]
:::
