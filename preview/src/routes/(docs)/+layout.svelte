<script lang="ts">
	import { DocsLayout } from '@svecodocs/kit'
	import { navigation } from '$lib/config/navigation'
	import { siteConfig } from '$lib/config/site'

	let { children } = $props()
</script>

<DocsLayout {navigation}>
	{#snippet logo()}
		<span class="text-2xl font-bold">{siteConfig.name}</span>
	{/snippet}

	{@render children()}
</DocsLayout>
