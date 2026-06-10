import type { SearchItem } from './search-index'

import { betterFetch } from '@better-fetch/fetch'
import { Document as FlexSearchDocument } from 'flexsearch'
import { SvelteSet } from 'svelte/reactivity'

export class SearchClient {
	get current(): SearchItem[] {
		return this.#matches
	}
	get stats() {
		return {
			matches: this.#matches.length,
			total: this.#documents.length,
		}
	}

	get status(): string {
		return this.#status
	}

	#documents: SearchItem[] = $state([])

	#index: FlexSearchDocument<SearchItem> | null = null

	#matches: SearchItem[] = $state([])
	#searchTimer: null | ReturnType<typeof setTimeout> = null
	#status: 'error' | 'idle' | 'loading' | 'ready' = $state('idle')
	#url: string

	constructor(url: string) {
		this.#url = url
	}

	async load(): Promise<void> {
		if (this.#status === 'loading' || this.#status === 'ready') return

		this.#status = 'loading'

		const { data, error } = await betterFetch<{ items: SearchItem[] }>(this.#url)

		if (error) {
			console.error(error.message || (error.status ? `HTTP ${error.status}` : 'Network error'))
			this.#status = 'error'
			return
		}

		this.#documents = data.items
		await this.#buildIndex()
		this.#matches = [...this.#documents]
		this.#status = 'ready'
	}
	search(query: string): void {
		if (this.#searchTimer) clearTimeout(this.#searchTimer)

		const trimmed = query.trim()
		if (trimmed.length < 2) return

		this.#searchTimer = setTimeout(() => {
			this.#runSearch(trimmed)
		}, 140)
	}

	async #buildIndex(): Promise<void> {
		const nextIndex = new FlexSearchDocument<SearchItem>({
			cache: true,
			context: true,
			document: {
				id: 'id',
				field: ['title', 'content'],
				store: ['kind', 'slug', 'title'],
			},
			tokenize: 'forward',
		})

		for (const item of this.#documents) {
			nextIndex.add(item)
		}

		this.#index = nextIndex
	}

	async #runSearch(normalizedQuery: string): Promise<void> {
		if (normalizedQuery.length < 2 || !this.#index) {
			this.#matches = [...this.#documents]
			return
		}

		const searchResults = this.#index.search(normalizedQuery, { enrich: true, limit: 12 })

		const found: SearchItem[] = []
		const seen = new SvelteSet<string>()

		for (const field of searchResults) {
			for (const result of field.result) {
				const id = String(result.id)

				if (seen.has(id)) continue

				seen.add(id)

				const item = this.#documents.find((currentItem) => currentItem.id === id)
				if (item) found.push(item)
			}
		}

		this.#matches = found
	}
}
