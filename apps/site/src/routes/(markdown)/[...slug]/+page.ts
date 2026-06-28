import { SITE_NAME } from '$lib/config/constants'
import { getDoc } from '$lib/content'
import { OgImage } from '$lib/og-image/index'

import { error } from '@sveltejs/kit'
import { definePageMetaTags } from 'svelte-meta-tags'

export const load = async ({ params }) => {
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

	const og = new OgImage({
		type: 'a',
		title: result.data.fm.title,
		category: result.data.fm.category,
	})

	return {
		md: result.data,
		ogUrl: og.toUrl(),
		...definePageMetaTags({
			title: `${result.data.fm.title} | ${SITE_NAME}`,
			openGraph: {
				title: result.data.fm.title,
				images: [{ url: og.toUrl() }],
			},
			twitter: {
				cardType: 'summary_large_image',
				image: og.toUrl(),
			},
		}),
	}
}
