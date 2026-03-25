---
title: How To Get All Routes
publish: true
tags:
---

## Describe the problem

You're looking to create a sitemap or a navigation menu and want an array of all the routes. SvelteKit provides a [`Pathname` type](https://svelte.dev/docs/kit/app-types#Pathname) that represents all possible routes, but it doesn't provide a way to get a list of all routes at runtime.

## Solution

```ts
const modules = import.meta.glob('/src/routes/**/+page.svelte')
const routes = Object.keys(modules).map((key) =>
	// prettier-ignore
	key
		.replace('/src/routes', '')
		.replace('/+page.svelte', '')
		.replace('/(group)', ''),
)
```
