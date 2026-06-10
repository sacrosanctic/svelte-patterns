<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation'
	import { resolve } from '$app/paths'
	import { tick } from 'svelte'

	import { searchDialog } from './Dialog.svelte'
	import { type SearchItem } from './search-index'
	import { SearchClient } from './SearchClient.svelte'

	import { createHotkey, createHotkeyAttachment, formatForDisplay } from '@tanstack/svelte-hotkeys'
	import IconClose from '~icons/mdi/close'
	import IconFileDocumentOutline from '~icons/mdi/file-document-outline'
	import IconLoading from '~icons/mdi/loading'
	import IconMagnify from '~icons/mdi/magnify'

	const searchClient = new SearchClient(resolve('/search-index.json'))

	let dialogElement: HTMLDialogElement
	let activeIndex = $state(-1)
	let query = $state('')

	const activeItem = $derived(activeIndex > -1 ? searchClient.current[activeIndex] : undefined)
	const activeResultId = $derived(
		activeItem ? `site-search-result-${encodeURIComponent(activeItem.id)}` : undefined,
	)

	const getItemRoute = (item: SearchItem) =>
		item.kind === 'docs' ? '/(markdown)/docs/[...slug]' : '/(markdown)/[...slug]'

	createHotkey('Mod+K', () => searchDialog.open())
	const closeHotkey = createHotkeyAttachment('Escape', () => handleDialogClose())
	const arrowDownHotkey = createHotkeyAttachment('ArrowDown', () => moveActiveItem(1))
	const arrowUpHotkey = createHotkeyAttachment('ArrowUp', () => moveActiveItem(-1))
	const enterHotkey = createHotkeyAttachment('Enter', () => openActiveItem())

	const openActiveItem = () => {
		if (!activeItem) return

		goto(resolve(getItemRoute(activeItem), activeItem))
		searchDialog.close()
	}

	const moveActiveItem = (direction: -1 | 1) => {
		if (searchClient.current.length === 0) return

		activeIndex =
			(activeIndex + direction + searchClient.current.length) % searchClient.current.length
	}

	const handleDialogClose = () => {
		searchDialog.close()
		query = ''
		activeIndex = -1
	}

	const handleDialogClick = (event: MouseEvent) => {
		if (event.target !== dialogElement) return

		const rect = dialogElement.getBoundingClientRect()
		const clickedOutside =
			event.clientX < rect.left ||
			event.clientX > rect.right ||
			event.clientY < rect.top ||
			event.clientY > rect.bottom

		if (clickedOutside) searchDialog.close()
	}

	$effect(() => {
		if (searchDialog.isOpen) {
			if (!dialogElement.open) dialogElement.showModal()

			searchClient.load()
			return
		}

		if (dialogElement.open) dialogElement.close()
	})

	$effect(() => {
		if (searchClient.current.length === 0) {
			activeIndex = -1
			return
		}

		if (activeIndex < 0) {
			activeIndex = 0
			return
		}

		if (activeIndex >= searchClient.current.length) {
			activeIndex = searchClient.current.length - 1
			return
		}
	})

	$effect(() => {
		if (!activeResultId) return

		tick().then(() => {
			document.getElementById(activeResultId)?.scrollIntoView({ block: 'nearest' })
		})
	})

	afterNavigate(() => {
		searchDialog.close()
	})
</script>

<dialog
	bind:this={dialogElement}
	aria-labelledby="search-dialog-title"
	class={[
		'fixed inset-x-2 top-auto bottom-2 m-0 h-[min(44rem,calc(100dvh-1rem))] max-h-[calc(100dvh-1rem)] w-auto max-w-none overflow-hidden rounded-xl border border-border bg-background p-0 text-foreground shadow-2xl outline-none backdrop:bg-black/45 backdrop:backdrop-blur-sm',
		'sm:inset-x-auto sm:top-[10dvh] sm:bottom-auto sm:left-1/2 sm:h-auto sm:max-h-[min(42rem,80dvh)] sm:w-[min(42rem,calc(100vw-2rem))] sm:-translate-x-1/2 sm:rounded-2xl',
	]}
	onclick={handleDialogClick}
	onclose={handleDialogClose}
	{@attach closeHotkey}
	{@attach arrowDownHotkey}
	{@attach arrowUpHotkey}
	{@attach enterHotkey}
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
						{formatForDisplay('Escape')}
					</kbd>
					<button
						type="button"
						class="inline-flex size-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
						aria-label="Close search"
						onclick={() => searchDialog.close()}
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
				<!-- svelte-ignore a11y_autofocus -->
				<input
					autofocus
					bind:value={query}
					id="site-search"
					aria-activedescendant={activeResultId}
					aria-autocomplete="list"
					aria-controls="site-search-results"
					aria-expanded={searchClient.current.length > 0}
					type="search"
					autocomplete="off"
					placeholder="Search components, routing, runes..."
					class="min-h-11 flex-1 border-0 bg-transparent p-0 text-base text-foreground shadow-none outline-none placeholder:text-muted-foreground focus:ring-0 sm:text-sm"
					role="combobox"
					oninput={() => searchClient.search(query)}
				/>
			</div>
		</div>

		<div class="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2 sm:p-3">
			{#if searchClient.status === 'loading'}
				<div
					class="flex min-h-48 flex-col items-center justify-center gap-3 text-sm text-muted-foreground"
				>
					<IconLoading class="size-6 animate-spin" aria-hidden="true" />
					<p>Loading search index...</p>
				</div>
			{:else if searchClient.status === 'error'}
				<div class="rounded-xl border border-border bg-muted/35 p-4 text-sm">
					<p class="font-medium text-foreground">Search is unavailable right now.</p>
					<p class="mt-1 text-muted-foreground">Please try again after refreshing the page.</p>
				</div>
			{:else if searchClient.stats.matches === 0}
				<div class="rounded-xl border border-dashed border-border bg-muted/25 p-6 text-center">
					<p class="text-sm font-medium text-foreground">No results for "{query.trim()}"</p>
					<p class="mt-1 text-sm text-muted-foreground">
						Try a shorter query or a related Svelte term.
					</p>
				</div>
			{:else}
				<ul id="site-search-results" class="grid gap-1" aria-label="Search results" role="listbox">
					{#each searchClient.current as item, index (item.id)}
						{@const isActive = index === activeIndex}
						{@const route = getItemRoute(item)}
						<li role="presentation">
							<a
								id={`site-search-result-${encodeURIComponent(item.id)}`}
								href={resolve(route, item)}
								aria-selected={isActive}
								class={[
									'group flex min-h-14 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-muted focus-visible:bg-muted',
									isActive && 'bg-muted',
								]}
								onclick={() => searchDialog.close()}
								role="option"
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
			<span>{searchClient.stats.matches} of {searchClient.stats.total} results</span>
			<span>
				<kbd class="rounded border border-border bg-background px-1.5 py-0.5"
					>{formatForDisplay('ArrowUp')}{formatForDisplay('ArrowDown')}</kbd
				>
				to navigate |
				<kbd class="rounded border border-border bg-background px-1.5 py-0.5"
					>{formatForDisplay('Enter')}</kbd
				>
				to open
			</span>
		</div>
	</div>
</dialog>
