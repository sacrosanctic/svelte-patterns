<script>
	let { children } = $props()
	let color = $state(null)

	function highlight(new_color) {
		color = new_color
		setTimeout(() => (color = null), 3000)
	}

	export { highlight }
</script>

<button style:--highlight={color}>
	{@render children?.()}
</button>

<style>
	button {
		padding: 0.5rem 1rem;
		color: var(--highlight, #ddd);
		border: 2px solid var(--highlight, #ddd);
		transition:
			color 250ms,
			border-color 250ms;
	}
</style>
