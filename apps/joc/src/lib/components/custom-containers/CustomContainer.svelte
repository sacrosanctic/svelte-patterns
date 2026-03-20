<script lang="ts">
	import type { Snippet } from 'svelte'

	const types = ['info', 'tip', 'warning', 'danger', 'details'] as const
	type Type = (typeof types)[number]

	type Props = {
		type: Type
		title?: string
		children: Snippet
	}

	let { type = 'info', title = '', children }: Props = $props()

	let isOpen = $state(false)

	const containerStyles: Record<Type, string> = {
		info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100',
		tip: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100',
		warning:
			'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100',
		danger:
			'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100',
		details:
			'border-gray-200 bg-gray-50 text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100',
	}

	const iconStyles: Record<Type, string> = {
		info: 'text-blue-600 dark:text-blue-400',
		tip: 'text-green-600 dark:text-green-400',
		warning: 'text-yellow-600 dark:text-yellow-400',
		danger: 'text-red-600 dark:text-red-400',
		details: 'text-gray-600 dark:text-gray-400',
	}

	const icons: Record<Type, string> = {
		info: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
		</svg>`,
		tip: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
		</svg>`,
		warning: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
		</svg>`,
		danger: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
		</svg>`,
		details: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
		</svg>`,
	}
</script>

<div class={['custom-container my-6 rounded-r-lg border-l-4 p-4', containerStyles[type]]}>
	{#if type === 'details'}
		<button
			class="flex w-full items-center gap-2 text-left font-semibold"
			onclick={() => (isOpen = !isOpen)}
		>
			{@html icons[type]}
			<span>{title}</span>
			<svg
				class="ml-auto size-4 transition-transform {isOpen ? 'rotate-90' : ''}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
				></path>
			</svg>
		</button>
		{#if isOpen}
			<div>
				{@render children()}
			</div>
		{/if}
	{:else}
		<div class="mb-2 flex items-center gap-2">
			<div class={iconStyles[type]}>
				{@html icons[type]}
			</div>
			<span class="font-semibold">{title}</span>
		</div>
		<div>
			{@render children()}
		</div>
	{/if}
</div>
