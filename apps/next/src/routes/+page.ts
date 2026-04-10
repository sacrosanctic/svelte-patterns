import { getFirstDoc, listDocs } from '$lib/content'

export const load = () => {
	const docs = listDocs()
	const currentDoc = getFirstDoc()

	if (!currentDoc) {
		return { currentDoc: null, currentSlug: '', docs }
	}

	return { currentDoc, currentSlug: currentDoc.slug, docs }
}
