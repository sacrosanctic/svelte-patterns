import { SITE_NAME } from '$lib/config/constants'
import { OgImage } from '$lib/server/og-image/index'

export const load = async () => {
	const og = new OgImage({ type: 'h', title: SITE_NAME })

	return {
		ogUrl: og.toUrl(),
	}
}
