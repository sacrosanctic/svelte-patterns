---
title: How To Make An Endpoint Return A File
publish: false
tags:
---

## Describe the problem

Common uses are `manifest.json`, an image, svg.

```js
import Component from '$lib/Component.svelte'
import { render } from 'svelte/server'

const rendered = render(Component, { props: { name: 'Svelte' } })

export const GET = async () => {
	return new Response(rendered.body, {
		headers: {
			'content-type': 'image/svg+xml',
		},
	})
}
```

```js
const svg = `
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" />
    <text x="50" y="50" font-size="20" text-anchor="middle" fill="black">${contributors}</text>
</svg>
`

export const GET = async () => {
	return new Response(svg, {
		headers: {
			'content-type': 'image/svg+xml',
		},
	})
}
```

## Reference
