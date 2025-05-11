<script lang="ts">
	import DocRenderer from '$lib/components/document/doc-renderer.svelte'

	let { data } = $props()
	let { title, description } = data.metadata
</script>

<DocRenderer {title} {description} {data} />
