<script>
	let { data } = $props()
</script>

<a href="/">reset</a>

<hr />

{#await data.promise}
	loading...
{:then result}
	{result}
{/await}
