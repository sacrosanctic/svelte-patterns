/* eslint-disable no-fallthrough */
import { AppError } from '$lib/content'

import { getDoc } from '../content'

import { error } from '@sveltejs/kit'

export const load = async ({ params, url }) => {
	const result = getDoc(params.slug)

	if (result.error?.name === 'DocNotFound') {
		// todo: download the list of endpoints from https://github.com/sveltejs/svelte.dev
		// and do a lookup in memory / file
		// move the logic into getDoc to remove this extra check
		const hasEndpoint = await checkEndpoint(`https://svelte.dev/docs/${params.slug}`)
		if (hasEndpoint) error(404, AppError.DocMissing({ path: params.slug }).error)
	}

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

const checkEndpoint = async (url: string) => {
	try {
		const res = await fetch(url, { method: 'HEAD' })
		const contentType = res.headers.get('content-type') ?? ''
		return res.ok && contentType.includes('text/html')
	} catch {
		return false
	}
}
