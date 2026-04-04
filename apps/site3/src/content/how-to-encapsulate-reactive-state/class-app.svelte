<script>
	import { onMount } from 'svelte'
	import { qr } from 'headless-qr'
	import { QRData } from './QRData.svelte.js'

	let canvas

	// let qrData
	const asdf = (node) => {
		// qrData = new QRData(canvas)
	}
</script>

<canvas use:asdf></canvas>

<hr />

<!-- <label>
	Enter a URL
	<input bind:value={qrData.text} />
</label>

<label>
	Choose a color
	<input type="color" bind:value={qrData.color} />
</label> -->

<style>
	label {
		display: block;
	}
	canvas {
		width: 200px;
		aspect-ratio: 1;
		image-rendering: pixelated;
	}
</style>
