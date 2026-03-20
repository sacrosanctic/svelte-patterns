import { error } from '@sveltejs/kit'
import type { MarkdocModule } from 'markdoc-svelte'
import { findContentFile } from '$lib/utils/content-resolver'

export const load = async ({ params }) => {
	const slug = params.slug

	// Use content resolver to find file with fallback logic
	const page = findContentFile(slug)

	if (!page) {
		throw error(404, `No corresponding file found for slug "${slug}"`)
	}

	return { page }
}
