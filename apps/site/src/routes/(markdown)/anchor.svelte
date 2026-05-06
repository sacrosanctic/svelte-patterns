<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements'

	import { afterNavigate, beforeNavigate } from '$app/navigation'
	import { onMount } from 'svelte'

	import { on } from 'svelte/events'

	let events: VoidFunction[] = []

	const scaffoldEvents = () => {
		const clickHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
			const anchor = e.currentTarget

			e.preventDefault()
			const href = anchor.getAttribute('href')
			if (!href) return

			const url = `${window.location.origin}${window.location.pathname}${href}`
			navigator.clipboard.writeText(url)

			const feedback = document.createElement('span')
			feedback.className = 'header-anchor-feedback'
			feedback.textContent = 'Copied!'
			anchor.parentElement?.appendChild(feedback)
			setTimeout(() => feedback.remove(), 1500)
		}

		const elements = document.querySelectorAll<HTMLAnchorElement>('.header-anchor')
		events = Array.from(elements).map((el) => on(el, 'click', clickHandler))

		return () => events.forEach((_) => _())
	}

	onMount(scaffoldEvents)
	beforeNavigate(() => events.forEach((_) => _()))
	afterNavigate(scaffoldEvents)
</script>

<style>
	:global {
		.header-anchor-feedback {
			position: absolute;
			left: 100%;
			margin-left: 0.5rem;
			font-size: 0.875rem;
			color: var(--primary);
			white-space: nowrap;
			opacity: 0;
			animation: fade-in-out 1.5s forwards;
		}

		.header-anchor {
			opacity: 0;
			float: left;
			margin-left: -1.2em;
			padding-right: 0.5em;
			text-decoration: none;
			transition: opacity 0.15s;
		}

		h1:hover .header-anchor,
		h2:hover .header-anchor,
		h3:hover .header-anchor,
		h4:hover .header-anchor,
		h5:hover .header-anchor,
		h6:hover .header-anchor {
			opacity: 0.5;
		}

		h1:hover .header-anchor:hover,
		h2:hover .header-anchor:hover,
		h3:hover .header-anchor:hover,
		h4:hover .header-anchor:hover,
		h5:hover .header-anchor:hover,
		h6:hover .header-anchor:hover {
			opacity: 1;
		}

		@keyframes -global-fade-in-out {
			0% {
				opacity: 0;
				transform: translateY(-0.1em);
			}
			20% {
				opacity: 1;
				transform: translateY(0);
			}
			80% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
	}
</style>
