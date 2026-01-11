<script>
	let { data } = $props()
</script>

{#await data.slow}
	loading...
{:then result}
	{result}
{/await}
