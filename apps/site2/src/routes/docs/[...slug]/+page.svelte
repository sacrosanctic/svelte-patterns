<script lang="ts">
	import DocRenderer from '$lib/components/document/doc-renderer.svelte'

	let { data }: { data: { page: any } } = $props()
</script>

<DocRenderer
	title={data.page.frontmatter?.title ?? 'no way'}
	description={data.page.frontmatter?.title ?? 'yes way'}
	data={{ doc: data.page.default }}
/>
