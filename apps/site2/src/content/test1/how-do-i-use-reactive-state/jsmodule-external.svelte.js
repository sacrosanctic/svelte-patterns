import { qr } from 'headless-qr'

export const wrapper = $state({
	text: 'https://example.com',
	color: '#000000',
})

export const getUrl = () => `${wrapper.text}?color=${wrapper.color}`

export const getCanvas = (node) => {
	$effect(() => {
		const modules = qr(getUrl())
		const ctx = node.getContext('2d')

		node.width = node.height = modules.length

		modules.forEach((row, y) => {
			row.forEach((cell, x) => {
				ctx.fillStyle = cell ? wrapper.color : 'white'
				ctx.fillRect(x, y, 1, 1)
			})
		})
	})
}
