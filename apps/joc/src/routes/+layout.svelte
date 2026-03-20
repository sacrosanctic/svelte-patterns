<script lang="ts">
	import Footer from './footer.svelte'
	import Header from './header.svelte'

	import './layout.css'
	// import 'uno.css'

	let { children } = $props()
</script>

<svelte:head><link rel="icon" href="https://fav.farm/🔥" /></svelte:head>
<div class="container mx-auto grid h-full grid-rows-[auto_1fr_auto] px-4">
	<Header />
	<main class="py-16 text-primary">{@render children()}</main>
	<Footer />
</div>
