<script>
	import { qr } from 'headless-qr'

	let text = $state('https://example.com')
	let color = $state('#000000')
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
<hr />

<label>
	Enter a URL
	<input bind:value={text} />
</label>

<br />

<label>
	Choose a color
	<input type="color" bind:value={color} />
</label>

<style>
	canvas {
		width: 200px;
		aspect-ratio: 1;
		image-rendering: pixelated;
	}
</style>
