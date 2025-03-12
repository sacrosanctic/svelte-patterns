<script lang="ts">
	import type { Snippet } from 'svelte'
	import {thumbHandle} from './slider.svelte.js'
	import type { Position } from './type.js'

	type Props = {
		active:boolean
		position: Position[number]
		children?:Snippet
	}

	let {
		active = $bindable(false),
		position = $bindable(),children
	}: Props = $props()

</script>

<button
	class="absolute top-1/2 size-0"
	style:left="{position * 100}%"
	use:thumbHandle
	ondragstart={() => ((active = true))}
	ondrag={e => (position = e.detail)}
	ondragend={() => ((active = false))}
>
	<div
		class="thumb-content"
		class:active
	>
		{@render children?.()}
	</div>
</button>

<style>
	.thumb-content {
		position: relative;
		width: fit-content;
		height: fit-content;
		transform: translate(-50%, -50%);
	}

	.thumb-content::before {
		content: '';
		position: absolute;
		width: 200%;
		height: 200%;
		transform: translate(-50%, -25%) scale(0);
		border-radius: 100vh;
		background: var(--thumb-bg, #5784fd);
		opacity: 30%;
		transition: transform 100ms ease-in-out;
	}

	.thumb-content.active::before {
		transform: translate(-50%, -25%) scale(1);
	}
</style>
