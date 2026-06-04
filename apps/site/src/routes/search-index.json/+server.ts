import { searchIndex } from '$lib/search/search-index'

import { json } from '@sveltejs/kit'

export const prerender = true

export const GET = () => json({ items: searchIndex })
