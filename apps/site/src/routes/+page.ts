import { SITE_NAME, TAG_LINE } from '$lib/config/constants'
import { OgImage } from '$lib/og-image/index'
import { definePageMetaTags } from 'svelte-meta-tags'

export const load = async () => {
	const og = new OgImage({ type: 'h', title: SITE_NAME })

	return {
		ogUrl: og.toUrl(),
		...definePageMetaTags({
			title: SITE_NAME,
			description: TAG_LINE,
			openGraph: {
				title: SITE_NAME,
				description: TAG_LINE,
				images: [{ url: og.toUrl() }],
			},
			twitter: {
				cardType: 'summary_large_image',
				image: og.toUrl(),
			},
		}),
	}
}
