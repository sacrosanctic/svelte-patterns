<script>
	const _id = $props.id()
	let { button, body, id = _id, ...rest } = $props()
</script>

<button commandfor={id} command="show-modal">
	{@render button()}
</button>

<dialog {...rest} {id}>
	{@render body()}

	<br />

	<button commandfor={id} command="close" value="accept">Accept</button>
	<button commandfor={id} command="close" value="cancel">Cancel</button>
</dialog>
