import { SITE_NAME } from '$lib/config/constants'

export const load = async ({ url }) => {
	const ogUrl = new URL('og.png', url.origin)
	ogUrl.searchParams.set('title', SITE_NAME)

	return {
		ogUrl: ogUrl.href,
	}
}
