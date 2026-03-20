<script lang="ts">
	import type { Highlighter } from 'shiki'
	import { onMount } from 'svelte'

	interface CodeFile {
		name: string
		filepath: string
		content: string
		language: string
	}

	interface TabChangeEvent {
		index: number
		file: CodeFile
	}

	let { files }: { files: CodeFile[] } = $props()

	let activeIndex = $state(0)
	let highlighter: Highlighter | null = $state(null)
	let highlightedCode = $state<string[]>([])

	// Generate unique IDs for accessibility
	const uid = $props.id()

	function switchTab(index: number) {
		activeIndex = index
		const file = files[index]
		if (file) {
			const event = new CustomEvent<TabChangeEvent>('tabChange', {
				detail: { index, file },
			})
			dispatchEvent(event)
		}
	}

	function escapeHtml(text: string): string {
		const div = document.createElement('div')
		div.textContent = text
		return div.innerHTML
	}

	// Initialize highlighter only once when browser is available
	onMount(() => {
		if (highlighter) return
		const initHighlighter = async () => {
			try {
				const { createHighlighter } = await import('shiki')
				const newHighlighter = await createHighlighter({
					themes: ['poimandres'],
					langs: ['javascript', 'typescript', 'svelte', 'jsx', 'css', 'html', 'json'],
				})
				highlighter = newHighlighter
			} catch (error) {
				console.error('Failed to load Shiki highlighter:', error)
			}
		}
		initHighlighter()
	})

	// Update highlighted code when highlighter or files change
	$effect(() => {
		if (highlighter && files.length > 0) {
			highlightedCode = files.map((file) => {
				if (!file?.language) {
					return escapeHtml(file?.content || '')
				}
				// Safe to use non-null assertion since we check highlighter exists
				const html = highlighter!.codeToHtml(file.content, {
					lang: file.language,
					theme: 'poimandres',
				})
				return html
			})
		} else if (files.length > 0) {
			// Fallback when no highlighter is available
			highlightedCode = files.map((file) => escapeHtml(file?.content || ''))
		}
	})
</script>

<div
	class="my-4 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-900"
>
	<!-- Tab Navigation -->
	<div
		class="flex overflow-x-auto border-b border-gray-200 bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800"
	>
		{#each files as file, i (file.filepath)}
			<button
				class={[
					'cursor-pointer border-b-2 border-transparent px-4 py-3 font-mono text-sm whitespace-nowrap transition-all duration-200',
					'text-gray-600  hover:bg-gray-100 hover:text-gray-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200',
					i === activeIndex &&
						'border-b-blue-600 bg-white text-blue-600 dark:border-b-blue-400 dark:bg-neutral-900 dark:text-blue-400',
				]}
				onclick={() => switchTab(i)}
				role="tab"
				aria-selected={i === activeIndex}
				aria-controls="code-panel-{uid}-{i}"
				id="tab-{uid}-{i}"
			>
				{file.name}
			</button>
		{/each}
	</div>

	<!-- Code Panels -->
	<div class="code-panel relative">
		{#each files as file, i (file.filepath)}
			<div
				class={['p-0', i !== activeIndex && 'hidden']}
				id="code-panel-{uid}-{i}"
				role="tabpanel"
				aria-labelledby="tab-{uid}-{i}"
			>
				{@html highlightedCode[i]}
			</div>
		{/each}
	</div>
</div>

<style>
	/* Shiki code styling */
	.code-panel {
		:global(pre) {
			margin: 0 !important;
			/* padding: 0 !important; */
			border-radius: 0 !important;
			background: #1e1e1e !important;
		}

		:global(code) {
			font-family:
				'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
			font-size: 0.875rem;
			line-height: 1.5;
		}
	}

	/* Dark mode adjustments for code blocks */
	@media (prefers-color-scheme: dark) {
		.code-panel :global(pre) {
			background: #0d1117 !important;
		}
	}
</style>
