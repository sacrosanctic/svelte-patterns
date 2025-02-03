<script>
	import { wrapper, getUrl, getCanvas } from './external.svelte'
</script>

<canvas use:getCanvas></canvas>
<p>{getUrl()}</p>
<hr />

<label>
	Enter a URL
	<input bind:value={wrapper.text} />
</label>

<br />

<label>
	Choose a color
	<input type="color" bind:value={wrapper.color} />
</label>

<style>
	canvas {
		width: 200px;
		aspect-ratio: 1;
		image-rendering: pixelated;
	}
</style>
