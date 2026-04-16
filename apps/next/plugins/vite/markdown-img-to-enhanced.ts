import type { Plugin } from 'vite'

export const markdownImgToEnhancedPlugin = (): Plugin => ({
	name: 'markdown-img-to-enhanced',
	enforce: 'pre',
	transform: {
		handler(code, id) {
			if (!id.includes('/src/content/') || !id.endsWith('.md')) return

			return code.replace(/<img\s+(?!.*src=["'](?:https?:)?\/\/)([^>]+)>/gi, '<enhanced:img $1 />')
		},
		order: 'pre',
	},
})
