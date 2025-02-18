<script>
	let { trigger, body } = $props()
	let dialog
</script>

{@render trigger?.(() => dialog.showModal())}

<dialog bind:this={dialog}>
	<p>Dialog</p>
	{@render body?.()}
	<button onclick={() => dialog.close()}>Close</button>
</dialog>
