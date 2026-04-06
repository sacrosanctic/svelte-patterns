import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'
import { VitePressSidebarOptions } from 'vitepress-sidebar/types'

const _prod = process.env.NODE_ENV === 'production'
const draftPath = 'unpublished/**'

const vitePressOptions = defineConfig({
	head: [
		[
			'script',
			{
				async: '',
				src: 'https://www.googletagmanager.com/gtag/js?id=G-70KZWMN9EZ',
			},
		],
		[
			'script',
			{},
			`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-70KZWMN9EZ');`,
		],
	],
	markdown: {
		lineNumbers: true,
	},
	srcExclude: _prod ? [draftPath] : [],
	lastUpdated: true,
	cleanUrls: true,
	title: 'Svelte Patterns',
	description: 'Bite sized goodie from the community',
	themeConfig: {
		outline: { level: [2, 3] },
		search: {
			provider: 'local',
			options: {
				detailedView: true,
				// https://github.com/vuejs/vitepress/issues/3083#issuecomment-1761463110
				_render: (src, env, md) => {
					const html = md.render(src, env)
					if (!env.frontmatter?.title) return html

					return md.render(`# ${env.frontmatter.title}`) + html
				},
			},
		},
		editLink: { pattern: 'https://github.com/sacrosanctic/svelte-patterns/edit/main/docs/:path' },
		socialLinks: [{ icon: 'github', link: 'https://github.com/sacrosanctic/svelte-patterns' }],
	},
})

const vitePressSidebarOptions = {
	hyphenToSpace: true,
	capitalizeFirst: true,
	documentRootPath: '/docs',
	collapsed: false,
	excludePattern: _prod ? [draftPath] : [],
} satisfies VitePressSidebarOptions

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions))
