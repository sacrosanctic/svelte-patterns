<script>
	import Dialog from './Dialog.svelte'
</script>

<Dialog>
	{#snippet button()}
		Open dialog
	{/snippet}
	{#snippet body()}
		<h1>Dialog</h1>
		This is the body.
	{/snippet}
</Dialog>
