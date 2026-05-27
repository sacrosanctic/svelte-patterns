<script lang="ts">
	import type { SearchItem } from '$lib/search/search-index'

	import { afterNavigate } from '$app/navigation'
	import { resolve } from '$app/paths'
	import { onMount, tick } from 'svelte'

	import { searchDialog } from '$lib/search/search-state.svelte'

	import IconClose from '~icons/mdi/close'
	import IconFileDocumentOutline from '~icons/mdi/file-document-outline'
	import IconLoading from '~icons/mdi/loading'
	import IconMagnify from '~icons/mdi/magnify'
	import FlexSearch from 'flexsearch'
	import { SvelteSet } from 'svelte/reactivity'

	type SearchDocument = {
		add: (item: SearchItem) => void
		search: (
			query: string,
			options: { enrich: true; limit: number },
		) => Promise<SearchFieldResult[]> | SearchFieldResult[]
	}

	type SearchFieldResult = {
		result: Array<{ id: number | string }>
	}

	type SearchPayload = {
		items: SearchItem[]
	}

	let dialogElement: HTMLDialogElement
	let inputElement: HTMLInputElement
	let index: null | SearchDocument = null
	let items = $state<SearchItem[]>([])
	let query = $state('')
	let results = $state<SearchItem[]>([])
	let searchTimer: null | ReturnType<typeof setTimeout> = null
	let status = $state<'error' | 'idle' | 'loading' | 'ready'>('idle')

	const hasQuery = $derived(query.trim().length >= 2)
	const shownItems = $derived(hasQuery ? results : items)

	const isEditableTarget = (target: EventTarget | null) =>
		target instanceof HTMLElement &&
		(target.isContentEditable || ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName))

	const buildClientIndex = (searchItems: SearchItem[]) => {
		const nextIndex = new FlexSearch.Document({
			cache: true,
			context: true,
			document: {
				id: 'id',
				field: ['title', 'content'],
				store: ['kind', 'slug', 'title'],
			},
			tokenize: 'forward',
		}) as SearchDocument

		for (const item of searchItems) {
			nextIndex.add(item)
		}

		index = nextIndex
	}

	const runSearch = async () => {
		const normalizedQuery = query.trim()

		if (normalizedQuery.length < 2 || !index) {
			results = []
			return
		}

		const searchResults = await index.search(normalizedQuery, { enrich: true, limit: 12 })
		const found: SearchItem[] = []
		const seen = new SvelteSet<string>()

		for (const field of searchResults) {
			for (const result of field.result) {
				const id = String(result.id)

				if (seen.has(id)) continue

				seen.add(id)

				const item = items.find((currentItem) => currentItem.id === id)
				if (item) found.push(item)
			}
		}

		results = found
	}

	const queueSearch = () => {
		if (searchTimer) clearTimeout(searchTimer)

		if (query.trim().length < 2) {
			results = []
			return
		}

		searchTimer = setTimeout(() => {
			void runSearch()
		}, 140)
	}

	const loadSearchIndex = async () => {
		if (status === 'loading' || status === 'ready') return

		status = 'loading'

		try {
			const response = await fetch(resolve('/search-index.json'))

			if (!response.ok) throw new Error('Failed to load search index')

			const payload = (await response.json()) as SearchPayload

			items = payload.items
			buildClientIndex(payload.items)
			status = 'ready'
			await runSearch()
		} catch {
			status = 'error'
		}
	}

	const focusInput = async () => {
		await tick()
		inputElement?.focus({ preventScroll: true })
	}

	const closeSearch = () => {
		searchDialog.close()
	}

	const handleDialogClose = () => {
		searchDialog.close()
		query = ''
		results = []
	}

	const handleDialogClick = (event: MouseEvent) => {
		if (event.target !== dialogElement) return

		const rect = dialogElement.getBoundingClientRect()
		const clickedOutside =
			event.clientX < rect.left ||
			event.clientX > rect.right ||
			event.clientY < rect.top ||
			event.clientY > rect.bottom

		if (clickedOutside) closeSearch()
	}

	const handleGlobalKeydown = (event: KeyboardEvent) => {
		if (!(event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey))) return
		if (isEditableTarget(event.target)) return

		event.preventDefault()
		searchDialog.open()
	}

	$effect(() => {
		if (searchDialog.isOpen) {
			if (!dialogElement.open) dialogElement.showModal()

			void loadSearchIndex()
			void focusInput()
			return
		}

		if (dialogElement.open) dialogElement.close()
	})

	afterNavigate(() => {
		searchDialog.close()
	})

	onMount(() => () => {
		if (searchTimer) clearTimeout(searchTimer)
	})
</script>

<svelte:window onkeydown={handleGlobalKeydown} />

<dialog
	bind:this={dialogElement}
	aria-labelledby="search-dialog-title"
	class={[
		'fixed inset-x-2 top-auto bottom-2 m-0 h-[min(44rem,calc(100dvh-1rem))] max-h-[calc(100dvh-1rem)] w-auto max-w-none overflow-hidden rounded-xl border border-border bg-background p-0 text-foreground shadow-2xl outline-none backdrop:bg-black/45 backdrop:backdrop-blur-sm',
		'sm:inset-x-auto sm:top-[10dvh] sm:bottom-auto sm:left-1/2 sm:h-auto sm:max-h-[min(42rem,80dvh)] sm:w-[min(42rem,calc(100vw-2rem))] sm:-translate-x-1/2 sm:rounded-2xl',
	]}
	oncancel={(event) => {
		event.preventDefault()
		closeSearch()
	}}
	onclick={handleDialogClick}
	onclose={handleDialogClose}
>
	<div class="flex h-full min-h-0 flex-col bg-background sm:h-[min(42rem,80dvh)]">
		<div class="border-b border-border bg-background/95 p-3 backdrop-blur sm:p-4">
			<div class="mb-3 flex items-center justify-between gap-4">
				<div>
					<h2 id="search-dialog-title" class="text-sm font-semibold tracking-tight">
						Search documentation
					</h2>
					<p class="mt-0.5 text-xs text-muted-foreground">
						Find Svelte Patterns and Svelte reference pages.
					</p>
				</div>

				<div class="flex items-center gap-2">
					<kbd
						class="hidden rounded-md border border-border bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground sm:inline-flex"
					>
						Esc
					</kbd>
					<button
						type="button"
						class="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
						aria-label="Close search"
						onclick={closeSearch}
					>
						<IconClose class="size-5" aria-hidden="true" />
					</button>
				</div>
			</div>

			<label for="site-search" class="sr-only">Search documentation</label>
			<div
				class="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-muted/45 px-3 shadow-sm focus-within:ring-2 focus-within:ring-ring/60"
			>
				<IconMagnify class="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
				<input
					bind:this={inputElement}
					bind:value={query}
					id="site-search"
					type="search"
					autocomplete="off"
					placeholder="Search components, routing, runes..."
					class="min-h-11 flex-1 border-0 bg-transparent p-0 text-base text-foreground shadow-none outline-none placeholder:text-muted-foreground focus:ring-0 sm:text-sm"
					oninput={queueSearch}
				/>
			</div>
		</div>

		<div class="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2 sm:p-3">
			{#if status === 'loading'}
				<div
					class="flex min-h-48 flex-col items-center justify-center gap-3 text-sm text-muted-foreground"
				>
					<IconLoading class="size-6 animate-spin" aria-hidden="true" />
					<p>Loading search index...</p>
				</div>
			{:else if status === 'error'}
				<div class="rounded-xl border border-border bg-muted/35 p-4 text-sm">
					<p class="font-medium text-foreground">Search is unavailable right now.</p>
					<p class="mt-1 text-muted-foreground">Please try again after refreshing the page.</p>
				</div>
			{:else if hasQuery && results.length === 0}
				<div class="rounded-xl border border-dashed border-border bg-muted/25 p-6 text-center">
					<p class="text-sm font-medium text-foreground">No results for "{query.trim()}"</p>
					<p class="mt-1 text-sm text-muted-foreground">
						Try a shorter query or a related Svelte term.
					</p>
				</div>
			{:else}
				<ul class="grid gap-1" aria-label={hasQuery ? 'Search results' : 'All searchable pages'}>
					{#each shownItems as item (item.id)}
						<li>
							<a
								href={resolve(
									item.kind === 'docs' ? '/(markdown)/docs/[...slug]' : '/(markdown)/[...slug]',
									item,
								)}
								class="group flex min-h-14 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-muted focus-visible:bg-muted"
								onclick={closeSearch}
							>
								<span
									class="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition group-hover:border-primary/30 group-hover:text-primary"
								>
									<IconFileDocumentOutline class="size-4" aria-hidden="true" />
								</span>
								<span class="min-w-0 flex-1">
									<span class="block truncate font-medium text-foreground">{item.title}</span>
									<span class="mt-0.5 block truncate text-xs text-muted-foreground">
										{item.kind === 'docs' ? 'Svelte docs' : 'Svelte Patterns'} / {item.slug}
									</span>
								</span>
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<div
			class="hidden border-t border-border bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground sm:flex sm:items-center sm:justify-between"
		>
			<span>{hasQuery ? `${results.length} matches` : `${items.length} pages indexed`}</span>
			<span
				>Press <kbd class="rounded border border-border bg-background px-1.5 py-0.5">Esc</kbd> to close</span
			>
		</div>
	</div>
</dialog>
