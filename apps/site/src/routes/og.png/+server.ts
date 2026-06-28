import { read } from '$app/server'
import DMSerifDisplay from '@fontsource/dm-serif-display/files/dm-serif-display-latin-400-normal.woff'
import Pretendard from '@fontsource/pretendard/files/pretendard-latin-400-normal.woff'
import PretendardSemibold from '@fontsource/pretendard/files/pretendard-latin-600-normal.woff'
import { dev } from '$app/env'
import { OgImage, type Font } from '$lib/og-image/index'

const fonts: Font[] = [
	{
		name: 'SansFont',
		data: await read(Pretendard).arrayBuffer(),
		weight: 400,
		style: 'normal',
	},
	{
		name: 'SansFontSemibold',
		data: await read(PretendardSemibold).arrayBuffer(),
		weight: 600,
		style: 'normal',
	},
	{
		name: 'DisplayFont',
		data: await read(DMSerifDisplay).arrayBuffer(),
		weight: 400,
		style: 'normal',
	},
]

export const GET = async ({ url }) => {
	const png = await OgImage.fromUrl(url).toPng(fonts)

	return new Response(png, {
		headers: {
			'Content-Type': 'image/png',
			...(dev ? {} : { 'Cache-Control': 'public, max-age=600' }),
		},
	})
}
