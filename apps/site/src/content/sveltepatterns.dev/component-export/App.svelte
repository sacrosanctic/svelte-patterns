<script>
	import Button from './Button.svelte'

	let ref = $state()
</script>

<form
	onsubmit={(e) => {
		e.preventDefault()
		ref.highlight(Math.random() > 0.5 ? 'green' : 'red')
	}}
>
	<Button bind:this={ref}>save</Button>
</form>
