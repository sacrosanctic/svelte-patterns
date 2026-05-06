import { qr } from 'headless-qr'

export class QRData {
	text = $state('https://example.com')
	color = $state('#000000')
	url = $derived(`${this.text}?color=${this.color}`)
	canvas

	constructor(canvas) {
		this.canvas = canvas

		$effect(() => {
			const modules = qr(this.url)
			const ctx = this.canvas.getContext('2d')

			this.canvas.width = this.canvas.height = modules.length

			modules.forEach((row, y) => {
				row.forEach((cell, x) => {
					ctx.fillStyle = cell ? this.color : 'white'
					ctx.fillRect(x, y, 1, 1)
				})
			})
		})
	}
}
