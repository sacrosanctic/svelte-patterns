/* eslint-disable no-fallthrough */
import { AppError, buildEditUrl } from '$lib/content'

import { getDoc } from '../content'

import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
	const result = getDoc(params.slug)

	if (result.error?.name === 'DocNotFound') {
		const hasEndpoint = await checkEndpoint(`https://svelte.dev/faq/${params.slug}`)
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

	return {
		editUrl: buildEditUrl(result.data.sourcePath),
		md: result.data,
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
