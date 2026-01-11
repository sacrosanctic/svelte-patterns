<script>
	import Slider from './Slider.svelte'

	let value = $state([10, 100])
	let range = $state(false)
</script>

value: {value[0]}
<input
	type="checkbox"
	bind:checked={range}
/>

<Slider
	{range}
	bind:value
	max={5}
	step={1}
/>
