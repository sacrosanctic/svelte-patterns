import { getDoc } from '$lib/content'

import { error } from '@sveltejs/kit'

export const load = async ({ params, url }) => {
	const result = getDoc(params.slug)

	if (result.error) {
		const { name } = result.error
		switch (name) {
			case 'DocMissing':
			case 'DocNotFound':
				error(404, result.error)
			case 'Unexpected':
				error(500)
			default:
				void (name satisfies never)
				error(500)
		}
	}

	const ogUrl = new URL('og.png', url.origin)
	ogUrl.searchParams.set('t', 'a')
	ogUrl.searchParams.set('title', result.data.fm.title)
	ogUrl.searchParams.set('category', result.data.fm.category)

	return {
		md: result.data,
		ogUrl: ogUrl.href,
	}
}
