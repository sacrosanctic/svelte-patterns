import type { Action } from 'svelte/action'
import { on } from 'svelte/events'

export const thumbHandle: Action = (node) => {
	const onDown = getOnDown(node)

	$effect(() => {
		const cleanup = [
			//
			on(node, 'touchstart', onDown),
			on(node, 'mousedown', onDown),
		]
		return () => cleanup.forEach((unsub) => unsub())
	})
}

const getOnDown = <T extends HTMLElement>(node: T) => {
	const onMove = getOnMove(node)

	return (e: TouchEvent | MouseEvent) => {
		e.preventDefault()
		node.dispatchEvent(new CustomEvent('dragstart'))

		const moveevent = 'touches' in e ? 'touchmove' : 'mousemove'
		const upevent = 'touches' in e ? 'touchend' : 'mouseup'

		const onUp = (e: TouchEvent | MouseEvent) => {
			e.stopPropagation()

			document.removeEventListener(moveevent, onMove)
			document.removeEventListener(upevent, onUp)

			node.dispatchEvent(new CustomEvent('dragend'))
		}

		document.addEventListener(moveevent, onMove)
		document.addEventListener(upevent, onUp)
	}
}

const getOnMove = <T extends HTMLElement>(node: T) => {
	const track = node.parentNode as HTMLDivElement

	return (e: TouchEvent | MouseEvent) => {
		const { left, width } = track.getBoundingClientRect()
		const clickOffset = 'touches' in e ? e.touches[0].clientX : e.clientX
		const clickPos = Math.min(Math.max((clickOffset - left) / width, 0), 1) || 0
		node.dispatchEvent(new CustomEvent('drag', { detail: clickPos }))
	}
}
