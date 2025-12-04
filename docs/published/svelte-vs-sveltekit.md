---
title: Svelte vs. SvelteKit
publish: false
tags: meta
---

## Svelte is a Compiled Language

A common point of confusion is "Svelte vs. SvelteKit." This question, however, presents a false dichotomy.

- **Svelte** is a language that compiles your components into highly optimized JavaScript.
- **SvelteKit** is an application framework powered by Svelte.

Because Svelte is a compiled language, it always needs a build tool (like Vite) to transform its code into something a browser can run. You can't just link to it in a `<script>` tag. The real decision isn't _if_ you use a tool with Svelte, but _which_ tool is right for your project.

## What is the Recommended Tool?

For the majority of projects, **SvelteKit is the officially recommended way to build applications with Svelte** ([src](https://svelte.dev/packages#:~:text=the%20official%20router%20is%20sveltekit)). It provides a complete development experience, including routing, server-side rendering, data fetching, and a flexible adapter system for deployments. Because it's maintained by the Svelte team, it guarantees the most seamless integration and support.

## Common Use Cases & Tooling

While SvelteKit is the default choice, the best tool can vary depending on your specific needs.

| Use Case          | Recommended Tooling   | Notes                                                                                                               |
| :---------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------ |
| Web App           | svelte + kit          | With [adapters](https://svelte.dev/docs/kit/adapters) for different [rendering strategies](./rendering-strategy.md) |
| Website (static)  | Svelte + kit          | `static-adapter`                                                                                                    |
| Website (static)  | Svelte + Astro        |                                                                                                                     |
| Mobile App        | Svelte + Lynx         | [Pending development](https://svelte-custom-renderers.com/)                                                         |
| Mobile App        | Svelte + SvelteNative | Svelte 4 only                                                                                                       |
| Desktop App       | Svelte + Kit          | [Electron adapter](https://github.com/LukeHagar/sveltekit-adapters?tab=readme-ov-file#electron-adapter)             |
| Browser Extension | Svelte + WXT          |                                                                                                                     |
|                   |

:::info Note
SvelteKit and WXT are vite plugins.
:::

:::info Future of SvelteKit
As SvelteKit's adapter system expands and its core becomes more modular over time, it's expected to cover even more use cases. Consequently, there will be even less reason to use Svelte in a non-SvelteKit context.
:::

## What About Other Routers?

While the [official Svelte package listing](https://svelte.dev/packages#routing) shows several community-built routers, a quick look at [npmtrends.com](https://npmtrends.com/@roxi/routify-vs-@sveltejs/kit-vs-svelte-pathfinder-vs-svelte5-router-vs-universal-router) reveals that SvelteKit is by far the most adopted solution.

Choosing a less common router means you'll miss out on the extensive community support, resources, and momentum of the official framework. Furthermore, describing SvelteKit as just a "router" undersells its rich [featureset](https://svelte.dev/docs/kit/introduction#SvelteKit-vs-Svelte).
