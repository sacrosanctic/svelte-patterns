import { AppError, type Md, type RawMd } from '$lib/content'

import { Ok, type Result } from 'wellcrafted/result'

const titleFromSlug = (slug: string) => {
	const name = slug.split('/').at(-1) ?? slug

	return name
		.split('-')
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ')
}

const buildDocEntries = (modules: Record<string, RawMd>): Md[] => {
	const entries: Md[] = []

	for (const [globPath, md] of Object.entries(modules)) {
		const slug = globPath
			.replace('/src/content/svelte.dev/docs/', '')
			.replace(/(\/index)?\.md$/, '')
			.replace(/^index$/, '')

		entries.push({
			component: md.default,
			fm: {
				category: 'resource',
				title: titleFromSlug(slug),
			},
			slug,
			sourcePath: globPath,
		})
	}

	return entries
}

const rawModules = import.meta.glob<RawMd>(`/src/content/svelte.dev/**/*.md`, {
	eager: true,
})

const sortedDocs = buildDocEntries(rawModules)
const docsBySlug = new Map<string, Md>(sortedDocs.map((d) => [d.slug, d]))

// Define your prefix redirects in a clean mapping
const PREFIX_REDIRECTS: Record<string, string> = {
	'ai/': 'ai',
}

export const getDoc = (slug: string): Result<Md, AppError> => {
	try {
		const match = Object.entries(PREFIX_REDIRECTS).find(([prefix]) => slug.startsWith(prefix))
		const searchKey = match ? match[1] : slug
		const doc = docsBySlug.get(searchKey)

		return doc ? Ok(doc) : AppError.DocNotFound({ path: slug })
	} catch (e) {
		return AppError.Unexpected({ cause: e })
	}
}
