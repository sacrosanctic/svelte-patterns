<script lang="ts">
	import IconMoon from '~icons/mdi/weather-night'
	import IconSun from '~icons/mdi/weather-sunny'
	import { mode, toggleMode } from 'mode-watcher'
</script>

<button
	type="button"
	role="switch"
	aria-checked={mode.current === 'dark'}
	aria-label="Toggle dark mode"
	class="relative inline-flex h-9 w-16 cursor-pointer items-center rounded-full border bg-muted transition-colors"
	onclick={toggleMode}
>
	<span
		class={[
			'absolute left-1 size-7 rounded-full bg-background shadow-sm ring-1 ring-border/50 transition-transform duration-200 ease-out',
			mode.current === 'dark' ? 'translate-x-7' : 'translate-x-0',
		]}
		aria-hidden="true"
	></span>

	<span
		class={[
			'relative z-10 flex flex-1 items-center justify-center transition-colors duration-200',
			mode.current !== 'dark' ? 'text-amber-500' : 'text-muted-foreground/40',
		]}
	>
		<IconSun class="size-4" aria-hidden="true" />
	</span>

	<span
		class={[
			'relative z-10 flex flex-1 items-center justify-center transition-colors duration-200',
			mode.current === 'dark' ? 'text-indigo-400' : 'text-muted-foreground/40',
		]}
	>
		<IconMoon class="size-4" aria-hidden="true" />
	</span>
</button>
