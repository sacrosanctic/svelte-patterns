<script lang="ts">
	import { SITE_NAME } from '$lib/config/constants'
	let { data } = $props()
</script>

<svelte:head>
	<title>{data.md.fm.title} | {SITE_NAME}</title>
	<meta property="og:image" content={data.ogUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={data.ogUrl} />
</svelte:head>

<data.md.component />
