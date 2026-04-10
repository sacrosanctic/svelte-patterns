import { AppError, buildDocEntries, type DocEntry, type RawMd } from '$lib/content'

import { Ok, type Result } from 'wellcrafted/result'

const rawModules = import.meta.glob<RawMd>(`/src/content/faq/**/*.md`, { eager: true })

const sortedDocs = buildDocEntries(rawModules, 'faq')
const docsBySlug = new Map<string, DocEntry>(sortedDocs.map((d) => [d.slug, d]))

export const listDocs = (): DocEntry[] => [...sortedDocs]

export const getDoc = (slug: string): Result<DocEntry, AppError> => {
	try {
		const doc = docsBySlug.get(slug)
		if (!doc) return AppError.DocNotFound({ path: slug })
		return Ok(doc)
	} catch (e) {
		return AppError.Unexpected({ cause: e })
	}
}