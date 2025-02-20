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

Running `node ./script.js` or `npx tsx ./script.js` won't work.

## Use `vite-node`

Run the following command:

`npx vite-node --options.transformMode.ssr='/.*/' ./script.js`

This ensures that your script uses the Vite configuration and runs it in server mode.

## Reference

- https://github.com/sveltejs/kit/discussions/9807
