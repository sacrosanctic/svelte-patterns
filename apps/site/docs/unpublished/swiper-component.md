---
title: Swiper Component
publish: false
tags:
---

## Describe the problem

:::code-group

```svelte [App.svelte]
<script>
	import Swiper from './Swiper.svelte'
</script>

<Swiper onSwipe={console.log} onDrag={console.log}>
	{#snippet left()}
		<button class="bg-red-700 h-full">hello</button>
	{/snippet}
	<div>my old friend</div>

	{#snippet right()}
		<button class="bg-green-700 h-full">bye</button>
	{/snippet}
</Swiper>
```

```svelte [Swiper.svelte]
<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { Attachment } from 'svelte/attachments'
	import { on } from 'svelte/events'

	type Props = {
		left: Snippet
		children: Snippet
		right: Snippet
		onSwipe?: (direction: 'left' | 'right') => void
		onDrag?: (percentage: number) => void
	}

	let { left, children, right, onSwipe, onDrag }: Props = $props()
	const threshold = 5

	const swiper: Attachment<HTMLElement> = (node) => {
		const onScroll = (e:Event) => {
			const scrollableWidth = node.scrollWidth - node.clientWidth
			const percentage = scrollableWidth > 0 ? node.scrollLeft / scrollableWidth : 0
			const mappedValue = percentage * 2 - 1 // Map 0..1 to -1..1
			onDrag?.(mappedValue)
		}

		const onTouchEnd = () => {
			const maxScroll = node.scrollWidth - node.clientWidth
			const { scrollLeft } = node

			if (scrollLeft <= threshold) {
				onSwipe?.('left')
			} else if (Math.abs(scrollLeft - maxScroll) <= threshold) {
				onSwipe?.('right')
			}
		}

		const teardown = [
			//
			on(node, 'scroll', onScroll),
			on(node, 'scrollend', onscroll!),
			on(node, 'touchend', onTouchEnd),
		]

		return () => teardown.forEach((fn) => fn())
	}
</script>

<div class="swipe" {@attach swiper}>
	{@render left()}
	{@render children()}
	{@render right()}
</div>

<style>
	.swipe {
		font-size: 36px;
		display: grid;
		grid-template-columns: auto 1fr auto;
		overflow-x: auto;
		border-block: 1px solid #666;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		container-type: inline-size;

		> :global(:nth-child(2)) {
			width: 100cqw;
			padding: 10px 20px;
			scroll-snap-align: center;
			text-align: center;
		}
	}
</style>

```

:::

## Reference

yoinked it from here

https://drop-in-graffiti.netlify.app/
https://www.youtube.com/watch?v=WjuqAGpj6DM&t=240s
