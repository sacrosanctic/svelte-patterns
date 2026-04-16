import { AppError, type Md, type RawMd } from '$lib/content'

import { Ok, type Result } from 'wellcrafted/result'

const buildDocEntries = (modules: Record<string, RawMd>): Md[] => {
	const entries: Md[] = []

	for (const [globPath, md] of Object.entries(modules)) {
		entries.push({
			component: md.default,
			fm: {},
			slug: globPath
				.replace('/src/content/svelte.dev/docs/', '')
				.replace(/(\/index)?\.md$/, '')
				.replace(/^index$/, ''),
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

export const getDoc = (slug: string): Result<Md, AppError> => {
	try {
		const doc = docsBySlug.get(slug)
		if (!doc) return AppError.DocNotFound({ path: slug })
		return Ok(doc)
	} catch (e) {
		return AppError.Unexpected({ cause: e })
	}
}
