import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'
import type { VitePressSidebarOptions } from 'vitepress-sidebar/types'

/** Sidebar links use /published/... but `rewrites` maps published/x.md → x.md, so routes are /x — align links with `page.relativePath` for active state. */
const PUBLISHED_LINK_PREFIX = /^\/published\//

const rewriteSidebarItem = (item: DefaultTheme.SidebarItem): DefaultTheme.SidebarItem => ({
	...item,
	link: item.link?.replace(PUBLISHED_LINK_PREFIX, '/') ?? item.link,
	items: item.items?.map(rewriteSidebarItem),
})

const rewriteSidebarLinksForPublishedRewrites = (
	sidebar: DefaultTheme.Config['sidebar'],
): DefaultTheme.Config['sidebar'] => {
	if (!sidebar) return sidebar
	if (Array.isArray(sidebar)) {
		return sidebar.map(rewriteSidebarItem)
	}
	return Object.fromEntries(
		Object.entries(sidebar).map(([path, group]) => {
			if (Array.isArray(group)) {
				return [path, group.map(rewriteSidebarItem)]
			}
			return [path, { ...group, items: group.items.map(rewriteSidebarItem) }]
		}),
	) as DefaultTheme.SidebarMulti
}

const _prod = process.env.NODE_ENV === 'production'
const dev = !_prod

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
	...(dev
		? {}
		: {
			scanStartPath: 'published',
		}),
} satisfies VitePressSidebarOptions

const merged = withSidebar(vitePressOptions, vitePressSidebarOptions)

export default defineConfig({
	...merged,
	themeConfig: {
		...merged.themeConfig,
		sidebar: rewriteSidebarLinksForPublishedRewrites(merged.themeConfig?.sidebar),
	},
})
