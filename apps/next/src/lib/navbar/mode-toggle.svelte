<script lang="ts">
	import IconMoon from '~icons/mdi/weather-night'
	import IconSun from '~icons/mdi/weather-sunny'
	import { mode, toggleMode } from 'mode-watcher'

	const isDark = $derived(mode.current === 'dark')

	const handleToggle = (event: MouseEvent) => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

		if (!document.startViewTransition || prefersReducedMotion) {
			toggleMode()
			return
		}

		const x = event.clientX
		const y = event.clientY
		const maxRadius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y),
		)

		const transition = document.startViewTransition(() => toggleMode())

		transition.ready.then(() => {
			document.documentElement.animate(
				{ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`] },
				{ duration: 500, easing: 'ease-out', pseudoElement: '::view-transition-new(root)' },
			)
		})
	}
</script>

<button
	type="button"
	onclick={handleToggle}
	aria-label="Toggle dark mode"
	title="Toggle dark mode"
	class="group relative inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95"
>
	<span class="sr-only">Toggle dark mode</span>

	<!-- Sun Icon -->
	<span
		class={[
			'absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
			isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100',
		]}
	>
		<IconSun class="size-5" />
	</span>

	<!-- Moon Icon -->
	<span
		class={[
			'absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
			isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0',
		]}
	>
		<IconMoon class="size-5" />
	</span>
</button>
