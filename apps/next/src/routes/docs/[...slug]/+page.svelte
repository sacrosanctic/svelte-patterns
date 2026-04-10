<script lang="ts">
	import DocsShell from '$lib/components/docs-shell.svelte'

	let { data } = $props()
</script>

<DocsShell docs={data.docs} currentDoc={data.currentDoc} currentSlug={data.currentSlug} />
