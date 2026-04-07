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

<article
	class={[
		'mx-auto max-w-prose px-4 py-8 md:px-6 lg:px-8',
		'prose-blue dark:prose-invert',
		'prose sm:prose-sm md:prose-base lg:prose-lg xl:prose-xl',
	]}
>
	<h1
		class="not-prose mb-6 text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-100"
	>
		Search
	</h1>

	<div class="not-prose mb-6">
		<label class="sr-only" for="doc-search">Search documentation</label>
		<input
			id="doc-search"
			type="search"
			placeholder="Search..."
			bind:value={query}
			oninput={handleInput}
			class={[
				'w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 shadow-sm',
				'transition placeholder:text-stone-400',
				'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
				'dark:border-neutral-600 dark:bg-neutral-900 dark:text-stone-100 dark:placeholder:text-neutral-500',
			]}
		/>
	</div>

	<ul
		class="not-prose flex flex-col gap-0.5 rounded-lg border border-stone-200 p-1 dark:border-neutral-800"
	>
		{#each query.length >= 2 ? results : items as item (item.slug)}
			<li>
				<a
					href={resolve('/docs/[...slug]', { slug: item.slug })}
					class={[
						'block rounded-md px-3 py-2 text-sm text-stone-800 transition',
						'hover:bg-stone-200/80 dark:text-stone-200 dark:hover:bg-neutral-800',
						'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
					]}
				>
					{item.title}
				</a>
			</li>
		{/each}
	</ul>

	{#if query.length >= 2 && results.length === 0}
		<p class="not-prose mt-4 text-sm text-stone-500 dark:text-neutral-400">
			No results found for "{query}"
		</p>
	{/if}
</article>
