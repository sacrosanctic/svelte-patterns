<script module>
	let dialog

	export const open = () => {
		dialog.showModal()
	}
	export const close = () => {
		dialog.close()
	}
</script>

<script>
	let { children } = $props()
</script>

<dialog bind:this={dialog}>
	{@render children?.(close)}
</dialog>
