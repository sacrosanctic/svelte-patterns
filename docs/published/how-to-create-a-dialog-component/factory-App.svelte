<script>
	import Dialog from './Dialog.svelte'
</script>

<Dialog>
	{#snippet trigger(onclick)}
		<button {onclick}>Open dialog</button>
	{/snippet}
	{#snippet body(onclick)}
		<h1>Dialog</h1>

		<form method="dialog"><button>HTML Close</button></form>
		<p>or</p>
		<button {onclick}>JS Close</button>
	{/snippet}
</Dialog>
