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
	const id = $props.id()
	let { children: fallback } = $props()
</script>

<dialog bind:this={dialog} {id}>
	{@render (children ?? fallback)?.(close)}
	<br />
	<button commandfor={id} command="close" value="accept">Accept</button>
	<button commandfor={id} command="close" value="cancel">Cancel</button>
</dialog>
