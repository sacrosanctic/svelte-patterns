---
title: How To Access Svelte Specific Api In A Script
publish: false
tags:
---

## Describe the problem

When you need to run a script that uses Svelte-specific features, such as:

- Seeding a database with API keys from `$env/private/static`
- Using Svelte aliases like `$lib` in an automation script
- Accessing any other Svelte-specific API

A simple `node ./script.js` or `npx tsx ./script.js` won't work because the script is not executed within a Vite context.

## Solution 1: `vite-node`

You can use `vite-node` to run your script within Vite's context.

`npx vite-node --options.transformMode.ssr='/.*/' ./script.js`

This command ensures that your script is processed by Vite, allowing it to understand Svelte-specific imports and environment variables.

## Solution 2: `vite-run`

In some cases, especially when using command runners like `npx` or `pnpm dlx`, you'll need a wrapper script to properly acquire the Vite context.

```diff
- npx @better-auth/cli generate
+ npx @sacrosanctic/vite-run@latest @better-auth/cli generate
```

## Reference

- https://github.com/sveltejs/kit/discussions/9807
- https://discord.com/channels/457912077277855764/1410008048793292872/1412042611442712586
