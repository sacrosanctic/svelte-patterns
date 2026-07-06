---
title: Progressive Migration
category: meta
tags:
  - api
  - progressive enhancement
---

> A major version release should not represent new code, it should represent the deletion of old code.

Progressive migration is the act of backporting features that involve breaking changes. They are usually behind an experimental flag, letting teams adopt them at their convenience. By the time you migrate to a major release, it is only a matter of removing the experimental flags.

See [Svelte experimental flags](https://svelte.dev/docs/cli/experimental#Options-features) for current feature list:

:::code-group

```js [vite.config.ts]
import { defineConfig } from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
	plugins: [
		sveltekit({
			// ...
			experimental: {
				remoteFunctions: true,
			},
			compilerOptions: {
				experimental: {
					async: true,
				},
			},
		}),
	],
})
```

:::

Not all features need to be behind feature flags if they can both coexist. For example, the change to `vite.config.ts` does not need one.

## History

Vue 3 introduced a "cliff" of breaking changes: global APIs were removed, internal reactivity layers altered. This caused ecosystem fragmentation: third-party libraries like Vuetify and BootstrapVue couldn't upgrade instantly, leaving enterprise teams stalled. The Vue team later backported features via Vue 2.7 as a "bridge release." The ecosystem learned from this and many frameworks have since started to follow this pattern.
