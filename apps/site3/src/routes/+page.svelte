<script lang="ts">
	import { resolve } from '$app/paths'

	import FlexSearch from 'flexsearch'
	import { SvelteSet } from 'svelte/reactivity'

	let { data } = $props()

	type Item = { content: string; slug: string; title: string }

	const items = $derived(data.items)

	const index = new FlexSearch.Document({
		cache: true,
		context: true,
		document: {
			id: 'slug',
			field: ['title', 'content'],
			store: ['title', 'slug'],
		},
		tokenize: 'forward',
	})

	$effect(() => {
		for (const item of items) {
			index.add(item)
		}
	})

	let query = $state('')
	let debounceTimer: null | ReturnType<typeof setTimeout> = null
	let results = $state<Item[]>([])

	const handleInput = (e: Event) => {
		const value = (e.target as HTMLInputElement).value
		query = value

		if (debounceTimer) clearTimeout(debounceTimer)

		if (value.length < 2) {
			results = []
			return
		}

		debounceTimer = setTimeout(async () => {
			const searchResults = await index.search(value, { enrich: true, limit: 10 })
			const seen = new SvelteSet<string>()
			const found: Item[] = []

			for (const field of searchResults) {
				for (const result of field.result as unknown[]) {
					const { id } = result as { id: string }
					if (!seen.has(id)) {
						seen.add(id)
						const item = items.find((i: Item) => i.slug === id)
						if (item) found.push(item)
					}
				}
			}

			results = found
		}, 150)
	}
</script>

<div class="mb-6">
	<input
		type="search"
		placeholder="Search..."
		bind:value={query}
		oninput={handleInput}
		class="w-full rounded border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
	/>
</div>

<ul class="flex flex-col">
	{#each query.length >= 2 ? results : items as item (item.slug)}
		<li>
			<a href={resolve('/[...slug]', { slug: item.slug })}>{item.title}</a>
		</li>
	{/each}
</ul>

{#if query.length >= 2 && results.length === 0}
	<p class="text-gray-500">No results found for "{query}"</p>
{/if}
