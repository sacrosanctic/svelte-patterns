---
title: How To Access Values From A package.json File
---

## Via The Package Manager Env

:::code-group

```ts [routes/+layout.server.ts]
import { npm_package_version } from '$env/static/private'

export const load = () => {
	return {
		version: npm_package_version,
	}
}
```

```svelte [routes/+page.svelte]
<script>
	let { data } = $props()
</script>

{data.version}
```

:::

- https://docs.npmjs.com/cli/v8/using-npm/scripts#packagejson-vars

## Via A Script

:::code-group

```ts
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const path = fileURLToPath(new URL('package.json', import.meta.url))
const pkg = JSON.parse(readFileSync(path, 'utf8'))

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__VERSION__: JSON.stringify(pkg.version),
	},
})
```

```svelte
App version: {__VERSION__}
```

:::

Addtional work needs to be done to support TS
`npm i -D @types/node`

```ts [app.d.ts]
declare const __VERSION__: string
```

- https://svelte.dev/docs/kit/faq#How-do-I-include-details-from-package.json-in-my-application

## Reference

- https://discord.com/channels/457912077277855764/1328261751178788885/1328331130788773911
