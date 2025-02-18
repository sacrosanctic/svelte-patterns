<script>
	import Dialog from './Dialog.svelte'
</script>

<Dialog>
	{#snippet trigger(onclick)}
		<button {onclick}>Open dialog</button>
	{/snippet}
	{#snippet body()}
		<h1>Hello!</h1>
	{/snippet}
</Dialog>
