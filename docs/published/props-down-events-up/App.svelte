<script>
	import Button from './Button.svelte'

	let value = $state(0)
</script>

<p>parent value: {value}</p>

<Button {value} onclick={(v) => (value += v)} />
