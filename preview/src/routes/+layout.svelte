<script lang="ts">
	import "./layout.css";
	import favicon from '$lib/assets/favicon.svg'

	import { siteConfig } from "$lib/config/site";
	import { useSiteConfig } from "@svecodocs/kit";

	let { children } = $props();

	useSiteConfig(() => siteConfig);
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
