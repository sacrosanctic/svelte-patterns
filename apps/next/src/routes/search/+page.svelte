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
		'prose sm:prose-sm md:prose-base lg:prose-lg xl:prose-xl',
		'prose-a:text-primary prose-a:decoration-primary/30 hover:prose-a:decoration-primary',
		'dark:prose-invert',
	]}
>
	<header class="not-prose mb-6">
		<p class="mb-3 text-sm">
			<a
				href={resolve('/')}
				class="inline-flex items-center gap-1.5 font-medium text-primary transition hover:text-primary-hover"
			>
				<span aria-hidden="true">&larr;</span>
				Documentation
			</a>
		</p>
		<h1 class="text-2xl font-semibold tracking-tight text-foreground">Search</h1>
	</header>

	<div class="not-prose mb-6">
		<label class="sr-only" for="doc-search">Search documentation</label>
		<input
			id="doc-search"
			type="search"
			placeholder="Search..."
			bind:value={query}
			oninput={handleInput}
			class={[
				'w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition placeholder:text-muted-foreground',
			]}
		/>
	</div>

	<ul class="not-prose flex flex-col gap-0.5 rounded-lg border border-border p-1">
		{#each query.length >= 2 ? results : items as item (item.slug)}
			<li>
				<a
					href={resolve(`/docs/${item.slug}`)}
					class="block rounded-md px-3 py-2 text-sm text-foreground transition hover:bg-muted-foreground/10"
				>
					{item.title}
				</a>
			</li>
		{/each}
	</ul>

	{#if query.length >= 2 && results.length === 0}
		<p class="not-prose mt-4 text-sm text-muted-foreground">
			No results found for "{query}"
		</p>
	{/if}
</article>
