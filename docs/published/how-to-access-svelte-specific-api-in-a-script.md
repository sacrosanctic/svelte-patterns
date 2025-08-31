---
title: How To Access Svelte Specific Api In A Script
publish: false
tags:
---

## Describe the problem

If you need to:

- seed a database using API keys in `$env/private/static`,
- run an automation with a svelte alias (`$lib`),
- or any Svelte specific API

Running `node ./script.js` or `npx tsx ./script.js` won't work. Since it is not running in a vite context.

## Use `vite-node`

Run the following command:

`npx vite-node --options.transformMode.ssr='/.*/' ./script.js`

This ensures that your script uses the Vite configuration and runs it in server mode.

## Use `vite-node` wrapper

In certain cases, using vite-node directly isn’t enough, and you’ll need to wrap your command.

:::code-group

```ts [./my-script.ts]
import { execSync } from 'child_process'

try {
	execSync('npx @better-auth/cli generate', { stdio: 'inherit' })
} catch (error) {
	console.error('Command execution failed:', error)
	process.exit(1)
}
```

:::

```bash
npx vite-node --options.transformMode.ssr='/.*/' ./my-script.ts
```

## Reference

- https://github.com/sveltejs/kit/discussions/9807
