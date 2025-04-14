<script>
	let { trigger, body } = $props()
	let dialog
</script>

{@render trigger?.(() => dialog.showModal())}

<dialog bind:this={dialog}>
	{@render body?.(() => dialog.close())}
</dialog>
