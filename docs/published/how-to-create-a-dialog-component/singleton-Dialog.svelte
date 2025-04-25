<script module>
	let dialog
	let children = $state()

	export const open = (snippet) => {
		children = snippet
		dialog.showModal()
	}
	export const close = () => {
		dialog.close()
	}
</script>

<script>
	let { children: fallback } = $props()
</script>

<dialog bind:this={dialog}>
	{@render (children ?? fallback)?.(close)}
</dialog>
