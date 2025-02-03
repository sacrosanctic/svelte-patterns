<script>
	let { value, onclick } = $props()
</script>

<p>child value: {value}</p>

<button onclick={() => onclick(1)}>add 1</button>
