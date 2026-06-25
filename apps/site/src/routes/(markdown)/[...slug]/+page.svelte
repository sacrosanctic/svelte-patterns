<script lang="ts">
	import { SITE_NAME } from '$lib/config/constants'
	let { data } = $props()
</script>

<svelte:head>
	<title>{data.md.fm.title} | {SITE_NAME}</title>
</svelte:head>

<data.md.component />
