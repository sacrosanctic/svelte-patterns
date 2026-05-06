import type { Plugin } from 'vite'

import { basename, extname } from 'node:path'

const toTitleCase = (str: string) =>
	str.replace(/-/g, ' ')
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')

export const markdownImgToEnhancedPlugin = (): Plugin => ({
	name: 'markdown-img-to-enhanced',
	enforce: 'pre',
	transform: {
		handler(code, id) {
			if (!id.includes('/src/content/') || !id.endsWith('.md')) return

			return code.replace(/<img\s+(?!.*src=["'](?:https?:)?\/\/)([^>]+)>/gi, (_, attrs) => {
			const srcMatch = attrs.match(/src=["']([^"']+)["']/)
			const altMatch = attrs.match(/alt=["']([^"']*)["']/)
			const titleMatch = attrs.match(/title=["']([^"']*)["']/)

			const alt = altMatch?.[1] ?? ''
			const title = titleMatch?.[1] ?? ''
			const src = srcMatch?.[1]

			if (!alt && src) {
				const filename = basename(src, extname(src))
				attrs = attrs
					.replace(/alt=["'][^"']*["']/, '')
					.replace(/\s+/g, ' ')
					.trim()
				attrs = `alt="${filename}" ${attrs}`.replace(/\s+/g, ' ').trim()
			}

			if (!title && src) {
				const filename = toTitleCase(basename(src, extname(src)))
				attrs = attrs
					.replace(/title=["'][^"']*["']/, '')
					.replace(/\s+/g, ' ')
					.trim()
				attrs = `title="${filename}" ${attrs}`.replace(/\s+/g, ' ').trim()
			}

			return `<enhanced:img ${attrs} />`
		})
		},
		order: 'pre',
	},
})
