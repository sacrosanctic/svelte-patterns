---
title: How To Add A Theme Switcher
publish: false
tags:
---

<script setup>
import SvelteRepl from '../../Svelte.vue'
import ThreeState from './how-to-add-a-theme-switcher/three-state.svelte?raw'
import TwoState from './how-to-add-a-theme-switcher/two-state.svelte?raw'
</script>

## 3 state switch

### Standalone Component

::: code-group
<<< ./how-to-add-a-theme-switcher/three-state.svelte [App.svelte]
:::
<SvelteRepl :files="[
	{
	name:'App.svelte',
	contents:ThreeState,
	},
]" />

## 2 State Switch

::: code-group
<<< ./how-to-add-a-theme-switcher/two-state.svelte [App.svelte]
:::
<SvelteRepl :files="[
	{
	name:'App.svelte',
	contents:TwoState,
	},
]" />

<!-- - https://github.com/sveltejs/svelte.dev/blob/eb1eb2b0fd928887dd2da48df54d633849070583/packages/site-kit/src/lib/state/theme.svelte.ts
- https://github.com/sveltejs/svelte.dev/blob/eb1eb2b0fd928887dd2da48df54d633849070583/packages/site-kit/src/lib/components/ThemeToggle.svelte -->

## For App

## Save user preference

TBD

## Tailwind Integration

TBD

## Expand to App Scope

TBD

## Multiple light and dark themes

TBD

## Reference

- https://nicobachner.com/sveltekit-theme-switch
- https://tailwindcss.com/docs/dark-mode
- https://web.dev/articles/color-scheme
- https://web.dev/articles/prefers-color-scheme#debugging_and_testing_dark_mode
<!-- - https://github.com/svecosystem/mode-watcher/blob/main/packages/mode-watcher/src/lib/mode-watcher-full.svelte
- https://github.com/svecosystem/mode-watcher/blob/main/packages/mode-watcher/src/lib/mode.ts -->
