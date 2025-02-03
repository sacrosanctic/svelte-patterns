import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'
import { VitePressSidebarOptions } from 'vitepress-sidebar/types'

const _prod = process.env.NODE_ENV === 'production'
const dev = !_prod

const vitePressOptions = defineConfig({
	markdown: {
		lineNumbers: true,
	},
	rewrites(id) {
		const parts = id.split('/')

		if (parts.length === 1) return id
		if (parts.length === 2) return parts[1]

		return id
	},

	lastUpdated: true,
	cleanUrls: true,
	title: 'Svelte Patterns',
	description: 'Bite sized goodie from the community',
	themeConfig: {
		outline: { level: [2, 3] },
		search: {
			provider: 'local',
			options: { detailedView: true },
		},
		editLink: { pattern: 'https://github.com/sacrosanctic/svelte-patterns/blob/main/docs/:path' },
		socialLinks: [{ icon: 'github', link: 'https://github.com/sacrosanctic/svelte-patterns' }],
	},
})

const vitePressSidebarOptions = {
	hyphenToSpace: true,
	capitalizeFirst: true,
	documentRootPath: '/docs',
	collapsed: false,
	...(dev
		? {}
		: {
				scanStartPath: 'published',
			}),
} satisfies VitePressSidebarOptions

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions))
