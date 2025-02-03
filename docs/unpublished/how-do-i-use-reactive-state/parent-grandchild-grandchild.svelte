<script>
	import { qr } from 'headless-qr'

	let { text, color } = $props()
	let url = $derived(`${text}?color=${color}`)

	let canvas

	$effect(() => {
		const modules = qr(url)
		const ctx = canvas.getContext('2d')

		canvas.width = canvas.height = modules.length

		modules.forEach((row, y) => {
			row.forEach((cell, x) => {
				ctx.fillStyle = cell ? color : 'white'
				ctx.fillRect(x, y, 1, 1)
			})
		})
	})
</script>

<canvas bind:this={canvas}></canvas>
<p>{url}</p>

<style>
	canvas {
		width: 200px;
		aspect-ratio: 1;
		image-rendering: pixelated;
	}
</style>
