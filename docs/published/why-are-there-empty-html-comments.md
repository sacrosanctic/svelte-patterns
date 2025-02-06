---
title: What do these empty HTML comments do
---

## They are hydration markers

::: info Written for
Svelte `5.17.3`
:::

These are markers used at runtime for the purposes of [hydration](https://svelte.dev/docs/kit/glossary#Hydration).

```html
<!---->
<!--[-->
<!--]-->
<!---->
<!---->
```

These markers can be removed by setting `export const csr = false`

- https://github.com/sveltejs/svelte/issues/14004#issuecomment-2442413965
- https://github.com/sveltejs/svelte/issues/15200#issuecomment-2639653583
