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

<select bind:value={preference} onchange={toggle}>
	<option>system</option>
	<option>light</option>
	<option>dark</option>
</select>

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
