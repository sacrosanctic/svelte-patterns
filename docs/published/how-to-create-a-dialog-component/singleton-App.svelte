<script>
	import Dialog, { open } from './Dialog.svelte'
</script>

<button onclick={open}>Open dialog</button>

<Dialog>
	{#snippet children(onclick)}
		<h1>Dialog</h1>

		<form method="dialog"><button>HTML Close</button></form>
		<p>or</p>
		<button {onclick}>JS Close</button>
	{/snippet}
</Dialog>
