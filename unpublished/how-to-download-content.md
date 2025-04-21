---
title: How To Download Content
publish: false
tags:
---

## Describe the problem

## Solution

:::code-group

```js [routes/download/+server.js]
import viteAsset from './favicon.png'
const externalAsset = 'https://cdn.britannica.com/75/123675-004-FA9F881D/Water-tower-Naaldwijk-Neth.jpg?s=1500x700&q=85'

export const POST = async ({ fetch }) => {
	// https://github.com/vitejs/vite/issues/12366
	// vite doesnt have a native way to import an array buffer, so we use fetch
	const response = await fetch(externalAsset)
	const arrayBuffer = await response.arrayBuffer()
	const contentType = response.headers.get('content-type')

	return new Response(arrayBuffer, {
		headers: {
			'content-type': contentType,
			'content-disposition': 'attachment; filename="thumbnail.png',
		},
	})
}
```

```svelte
<form action="/download" method="POST">
	<button>Download</button>
</form>
```

:::

### a tag

```svelte
<a href={file.url} download={file.name}>Download</a>
```

### js

```js
const download = (file) => {
	const a = document.createElement('a')
	a.href = file.url
	a.download = file.name
	a.click()
}
```

## Reference

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition
