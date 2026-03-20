---
title: Why Are There Empty Html Comments
---

## They are hydration markers

::: info Written for
Svelte `5.17.3`
:::

These are markers used at runtime for the purposes of [hydration](https://svelte.dev/docs/kit/glossary#Hydration). [src](https://github.com/sveltejs/svelte/issues/14004#issuecomment-2442413965)

```html
<!---->
<!--[-->
<!--]-->
<!---->
<!---->
```

## How to remove

Sveltekit currently does not provide a native API to remove them. [src](https://svelte.dev/docs/svelte/v5-migration-guide#Changes-to-compiler-options).

A possible workaround is to run a postbuild script to remove them.

:::code-group

```json [package.json]
{
	"scripts": {
		"postbuild": "node removeComments.js"
	}
}
```

```js [removeCOmments.js]
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const outdir = '.svelte-kit'

const removeComments = (filePath) => {
	let content = readFileSync(filePath, 'utf-8')
	content = content.replace(/<!--.*?-->/gs, '')
	writeFileSync(filePath, content, 'utf-8')
}

const processDir = (dirPath) => {
	readdirSync(dirPath).forEach((file) => {
		const fullPath = join(dirPath, file)

		if (statSync(fullPath).isDirectory()) processDir(fullPath)
		else if (fullPath.endsWith('.html')) removeComments(fullPath)
	})
}

processDir(outdir)
console.log('Removed comments from HTML files.')
```

:::

## These options do not work

### `preserveComment = false`

This only refer to user comments.

- https://svelte.dev/docs/svelte/svelte-compiler#CompileOptions:~:text=preserveComments

### `CSR = false`

Setting `export const csr = false` no longer removes the comments. [src](https://github.com/sveltejs/kit/issues/1371#issuecomment-906513354).

## Reference

- https://svelte.dev/docs/svelte/v5-migration-guide#Other-breaking-changes-Hydration-works-differently
- https://github.com/sveltejs/svelte/issues/15200#issuecomment-2639653583
