<script lang="ts">
	import { untrack, type Snippet } from 'svelte'
	import Thumb from './Thumb.svelte'
	import type { Position } from './type'

	type Props = {
		name?: string[]
		range?: boolean
		min?: number
		max?: number
		step?: number
		value?: number[]
		order?: boolean
		left?: Snippet
		children?: Snippet
		right?: Snippet
		oninput?: (position: Position) => void
	}

	const setPosition = () => {
		positions = value
			.map((v) => Math.min(Math.max(v, min), max)) // Clamp v between min and max
			.map((v) => (v - min) / (max - min)) // Quantize to step size
	}

	const setValue = () => {
		const offset = min % step
		value = positions
			.map((v) => min + v * progressBarWidth) // Convert normalized position to real value
			.map((v) => Math.round((v - offset) / step) * step + offset) // Snap to step

		oninput?.(value)
	}

	let {
		name = [],
		range = false,
		min = 0,
		max = 100,
		step = 1,
		value = $bindable([min, max]),
		left,
		children,
		right,
		oninput,
	}: Props = $props()

	let positions: Position = $state([])
	let active = $state(false)

	let progressBarWidth = $derived(max - min)
	let progressBarLeft = $derived(range ? Math.min(positions[0], positions[1]) * 100 : 0)
	let progressBarRight = $derived(
		100 - Math.max(positions[0], range ? positions[1] : positions[0]) * 100,
	)

	// provide initial value
	setPosition()

	$effect(() => {
		void min, max
		if (!active) untrack(setPosition)
	})
	$effect(() => {
		void $state.snapshot(positions)
		if (active) untrack(setValue)
	})

	let stepPositions = Array.from(
		{ length: Math.floor((max - min) / step) + 1 },
		(_, i) => ((i * step) / (max - min)) * 100,
	)
</script>

<input type="hidden" value={value[0]} name={name[0]} />

{#if range}
	<input type="hidden" value={value[1]} name={name[1]} />
{/if}

<div class="relative mx-2 my-4 h-1 w-[calc(100%-1rem)] rounded-full bg-[#ebebeb]">
	<!-- Notches -->
	{#each stepPositions as position}
		<div class="  absolute-center w-1 h-8 bg-[#ebebeb]" style="left: {position}%"></div>
	{/each}

	<!-- Progress Line -->

	<div
		class="absolute inset-0 rounded-full bg-[#8abdff]"
		style:left="{progressBarLeft}%"
		style:Right="{progressBarRight}%"
	></div>

	{#if range}
		<Thumb
			bind:position={() => positions[1], (v) => (positions[1] = Math.max(v, positions[0]))}
			bind:active
		>
			{#if right}
				{@render right()}
			{:else if children}
				{@render children()}
			{:else}
				<div class="size-4 rounded-full bg-[#5784fd]"></div>
			{/if}
		</Thumb>
	{/if}

	<Thumb
		bind:position={() => positions[0], (v) => (positions[0] = Math.min(v, positions[1]))}
		bind:active
	>
		{#if left}
			{@render left()}
		{:else if children}{@render children()}{:else}
			<div class="size-4 rounded-full bg-[#5784fd]"></div>
		{/if}
	</Thumb>
</div>
