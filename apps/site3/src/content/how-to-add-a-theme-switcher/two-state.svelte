<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity'

	const query = new MediaQuery('(prefers-color-scheme: dark)', false)
	let preference: 'system' | 'light' | 'dark' = $state('system')
	let theme: 'light' | 'dark' = $state(query.current ? 'dark' : 'light')

	$effect(() => {
		document.documentElement.classList.remove('light', 'dark')
		document.documentElement.classList.add(theme)
	})

	const toggle = () => {
		const next = theme === 'light' ? 'dark' : 'light'
		preference = next === theme ? 'system' : next

		theme =
			preference === 'system' //
				? query.current
					? 'dark'
					: 'light'
				: preference
	}
</script>

<!-- prevent FOUC -->
<svelte:head>
	<script>
		{
			const output = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
			document.documentElement.classList.add(output)
		}
	</script>
</svelte:head>

<button onclick={toggle}>toggle</button>

<style lang="postcss">
	:global(html) {
		background: var(--bg);
	}
	:global(html.light) {
		--bg: hsl(138, 100%, 89%);
	}

	:global(html.dark) {
		--bg: hsl(126, 100%, 14%);
	}
</style>
