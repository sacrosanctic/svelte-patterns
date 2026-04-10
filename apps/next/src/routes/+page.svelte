<script lang="ts">
	import DocsShell from '$lib/components/docs-shell.svelte'

	let { data } = $props()
</script>

{#if data.currentDoc}
	<DocsShell docs={data.docs} currentDoc={data.currentDoc} currentSlug={data.currentSlug} />
{:else}
	<p class="px-4 py-8 text-stone-600 dark:text-stone-400">
		No documentation pages are available yet.
	</p>
{/if}
