<script lang="ts">
	import favicon from '$lib/assets/favicon.svg'
	import Navbar from '$lib/navbar/navbar.svelte'
	import SearchDialog from '$lib/search/search-dialog.svelte'

	import Agentation from './agentation.svelte'

	import { ModeWatcher } from 'mode-watcher'
	import './layout.css'
	import Metatags from './Metatags.svelte'

	let { children } = $props()
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Metatags />
<Agentation />
<ModeWatcher />
<Navbar />
<SearchDialog />

{@render children()}
