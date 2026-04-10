<script>
	let value = $state(20)
	let percentage = $derived(`${value}%`)
	let opacity = $derived(`${value}%`)
</script>

<div style:opacity="{value}%">Hi!</div>
<div style:opacity={percentage}>Hi!!</div>
<div style:opacity>Hi!!!</div>

<br />

<input type="range" bind:value />
{value}
