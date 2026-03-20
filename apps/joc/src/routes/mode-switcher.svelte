<!--
@component
Theme Toggle Component
This theme system consists of 3 parts:
1. <ModeWatcher /> in route/+layout.svelte - Detects system preference and manages state
2. This component - Provides UI for users to toggle between themes
3. layout.css - Uses light-dark() function to automatically apply colors based on color-scheme
How it works:
- light-dark(light-value, dark-value) automatically uses the first value for light mode
and the second value for dark mode
- The smartToggle() function intelligently switches between light/dark/system modes
- When manually set mode matches system preference, it reverts to 'system' mode

### reference
- https://www.captaincodeman.com/implementing-dark-mode-in-sveltekit#the-pitfalls-of-cookies-and-ssr-why-its-a-suboptimal-choice
-->

<script lang="ts">
	import { mode, ModeWatcher, setMode, systemPrefersMode } from 'mode-watcher'
	import Sun from '@lucide/svelte/icons/sun'
	import Moon from '@lucide/svelte/icons/moon'

	function smartToggle() {
		const nextMode = mode.current === 'light' ? 'dark' : 'light'

		if (nextMode === systemPrefersMode.current) {
			setMode('system')
		} else {
			setMode(nextMode)
		}
	}
</script>

<ModeWatcher />

<button
	onclick={smartToggle}
	aria-label="Toggle theme"
	aria-pressed={mode.current === 'dark'}
	class="flex items-center justify-center w-8 h-8 border border-border rounded-lg bg-transparent cursor-pointer p-0 transition-all duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
>
	<div class="flex items-center justify-center">
		{#if mode.current === 'dark'}
			<Sun class="hover:text-brand transition-colors duration-500 text-brand " />
		{:else}
			<Moon class="hover:text-brand transition-colors duration-500" />
		{/if}
	</div>
</button>
