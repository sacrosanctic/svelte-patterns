---
title: Getting Started With Vscode
publish: false
tags:
---

This page aims to gather all resources related to `Svelte` and `VS Code`.

## Install The Official Extension

https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode

## Enable File Nesting

![alt text](getting-started-with-vscode-1.png)

Keep your `Explorer View` compact by nesting related files together.

:::code-group

```json [settings.json]
{
	// ...
	"explorer.fileNesting.enabled": true,
	"explorer.fileNesting.expand": false,
	"explorer.fileNesting.patterns": {
		"+*.svelte": "+${capture}.js, +${capture}.server.js, +${capture}.ts, +${capture}.server.ts",
		"*.svelte": "${capture}.stories.svelte,${capture}.stories.ts"
	}
}
```

:::

- https://code.visualstudio.com/updates/v1_67#_explorer-file-nesting
- https://github.com/antfu/vscode-file-nesting-config

## Put Files First

Since Sveltekit uses a [filesystem-based router](https://svelte.dev/docs/kit/routing), placing files first keeps related items grouped together within their folder.

:::code-group

```json [settings.json]
{
	// ...
	"explorer.sortOrder": "filesFirst"
}
```

:::

## Custom File labels

Sveltekit's [filesystem-based router](https://svelte.dev/docs/kit/routing) gives every file the same name. Which can be difficult to distinguish when multiple are open. The [custom label](https://code.visualstudio.com/docs/getstarted/userinterface#_customize-tab-labels) feature can help clear this up. Open `.vscode/settings.json` and add the following.

:::code-group

```json [settings.json (compact)]
{
	// ...
	"workbench.editor.customLabels.patterns": {
		// ─── +page ────────────────────────────────────────────────────────────────
		"**/routes/**/*/+page.{svelte,[tj]s}": "${dirname} ❱ page",
		"**/routes/+page.{svelte,[tj]s}": "/ ❱ page",
		"**/routes/**/*/+page.server.[tj]s": "${dirname} ❱ page.server",
		"**/routes/+page.server.[tj]s": "/ ❱ page.server",

		// ─── +error ───────────────────────────────────────────────────────────────
		"**/routes/**/*/+error.svelte": "${dirname} ❱ error",
		"**/routes/+error.svelte": "/ ❱ error",

		// ─── +layout ──────────────────────────────────────────────────────────────
		"**/routes/**/*/+layout.{svelte,[tj]s}": "${dirname} ❱ layout",
		"**/routes/+layout.{svelte,[tj]s}": "/ ❱ layout",
		"**/routes/**/*/+layout.server.[tj]s": "${dirname} ❱ layout.server",
		"**/routes/+layout.server.[tj]s": "/ ❱ layout.server",

		// ─── +server ──────────────────────────────────────────────────────────────
		"**/routes/**/*/+server.[tj]s": "${dirname} ❱ API",
		"**/routes/+server.[tj]s": "/ ❱ API"
	}
}
```

```json [settings.json (expanded)]
{
	// ...
	"workbench.editor.customLabels.patterns": {
		// ─── +page ────────────────────────────────────────────────────────────────
		// Component
		"**/routes/**/*/+page.svelte": "${dirname} ❱ page",
		"**/routes/+page.svelte": "/ ❱ page",
		// Page Data
		"**/routes/**/*/+page.[tj]s": "${dirname} ❱ page",
		"**/routes/+page.[tj]s": "/ ❱ page",
		// Page Server Data
		"**/routes/**/*/+page.server.[tj]s": "${dirname} ❱ page.server",
		"**/routes/+page.server.[tj]s": "/ ❱ page.server",

		// ─── +error ───────────────────────────────────────────────────────────────
		"**/routes/**/*/+error.svelte": "${dirname} ❱ error",
		"**/routes/+error.svelte": "/ ❱ error",

		// ─── +layout ──────────────────────────────────────────────────────────────
		// Component
		"**/routes/**/*/+layout.svelte": "${dirname} ❱ layout",
		"**/routes/+layout.svelte": "/ ❱ layout",
		// Layout Data
		"**/routes/**/*/+layout.[tj]s": "${dirname} ❱ layout",
		"**/routes/+layout.[tj]s": "/ ❱ layout",
		// Page Layout Data
		"**/routes/**/*/+layout.server.[tj]s": "${dirname} ❱ layout.server",
		"**/routes/+layout.server.[tj]s": "/ ❱ layout.server",

		// ─── +server ──────────────────────────────────────────────────────────────
		"**/routes/**/*/+server.[tj]s": "${dirname} ❱ API",
		"**/routes/+server.[tj]s": "/ ❱ API"
	}
}
```

:::

## Breakpoint Debugging

https://svelte.dev/docs/kit/debugging#Visual-Studio-Code

::

### Explicit Extensions

```json
{
	"javascript.preferences.importModuleSpecifierEnding": "js",
	"typescript.preferences.importModuleSpecifierEnding": "js"
}
```
