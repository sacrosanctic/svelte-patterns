<script lang="ts">
	import favicon from '$lib/assets/favicon.svg'

	import Anchor from './anchor.svelte'

	import { ModeWatcher } from 'mode-watcher'

	import './layout.css'
	let { children } = $props()
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />
<Anchor />
{@render children()}
