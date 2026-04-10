<script lang="ts">
	import { page } from '$app/state'
</script>

{#if page.error && 'name' in page.error}
	{#if page.error.name === 'DocMissing'}
		Ooops, there aren't any companion docs for this page. Click here to add some.
	{:else if page.status === 404}
		<h1>{page.status}: Page not found</h1>
	{:else}
		<h1>{page.status}: {page.error.message}</h1>
	{/if}
{/if}
