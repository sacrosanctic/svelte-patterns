<script lang="ts">
	import { siteConfig } from '$lib/config/site'
	import { DocPage } from '@svecodocs/kit'
	let { data } = $props()
</script>

<svelte:head>
	<title>{data.metadata.title}</title>
	<meta name="description" content={data.metadata.description} />
</svelte:head>

<DocPage
	{...data.metadata}
	component={data.component}
	contributors={data.contributors}
	metadata={{
		ogImage: {
			url: `https://runed.dev/og?title=${encodeURIComponent(data.metadata.title)}&description=${encodeURIComponent(data.metadata.description)}`,
			width: siteConfig.ogImage?.width ?? '1200',
			height: siteConfig.ogImage?.height ?? '630',
		},
	}}
/>
