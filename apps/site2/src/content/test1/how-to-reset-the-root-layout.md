---
title: How To Reset The Root Layout
description: Learn how to break out of root layout using layout groups in SvelteKit
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

Create two [layout groups](https://svelte.dev/docs/kit/advanced-routing#Advanced-layouts-(group)>). One with a header and one without.

```js
/routes
├── +page.svelte
└── /(hasHeader)
    ├── +layout.svelte
    └── /about
        └── +page.svelte
```

## Implementation Examples

**routes/(hasHeader)/+layout.svelte:**
```svelte
<!-- Layout with header -->
<header>
  <nav>Navigation</nav>
</header>

<main>
  <slot />
</main>
```

**routes/(hasHeader)/about/+page.svelte:**
```svelte
<!-- About page with header -->
<h1>About</h1>
<p>This page has the header layout.</p>
```

**routes/+page.svelte:**
```svelte
<!-- Front page without header -->
<h1>Welcome</h1>
<p>This page does not have the header layout.</p>
```

**Interactive Example - See source code in respective files**

## Benefits

- **Clean separation**: Pages can opt-in to specific layouts
- **Maintainable**: Each layout group manages its own structure
- **Flexible**: Multiple layout variations possible
- **Performance**: Only required layouts are loaded

## References

- [SvelteKit Advanced Layouts](https://svelte.dev/docs/kit/advanced-routing#Advanced-layouts)
- [Layout Groups Documentation](https://svelte.dev/docs/kit/advanced-routing#Advanced-layouts-(group))