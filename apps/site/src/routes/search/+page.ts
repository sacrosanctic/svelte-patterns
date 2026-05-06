type SearchItem = { content: string; slug: string; title: string }

const stripMarkdown = (content: string) => {
	return content
		.replace(/^#+\s+.+$/gm, '')
		.replace(/```[\s\S]*?```/g, '')
		.replace(/`[^`]+`/g, '')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/[*_~>]/g, '')
		.replace(/^\s*[-*+]\s+/gm, '')
		.replace(/^\s*\d+\.\s+/gm, '')
		.replace(/\n{3,}/g, '\n\n')
		.trim()
}

const normalizeSlug = (name: string) =>
	name
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '')

const getSvelteDevSlug = (globPath: string) =>
	globPath
		.replace('/src/content/svelte.dev/', '')
		.replace(/(\/index)?\.md$/, '')
		.replace(/^index$/, '')

const getSveltePatternsDevSlug = (globPath: string) => {
	const parts = globPath.split('/')
	const filename = parts.pop()!.replace('.md', '')
	const name = filename === 'index' ? parts.pop()! : filename
	return normalizeSlug(name)
}

type RawMd = { default: unknown; frontmatter: Record<string, unknown> }

const buildSearchIndex = (
	rawModules: Record<string, string>,
	modules: Record<string, RawMd>,
	getSlug: (path: string) => string,
): SearchItem[] => {
	const items: SearchItem[] = []

	for (const [globPath, raw] of Object.entries(rawModules)) {
		const slug = getSlug(globPath)

		if (!slug) continue

		const md = modules[globPath]
		const title = (md?.frontmatter?.title as string) ?? slug
		const content = stripMarkdown(raw)

		items.push({ content, slug, title })
	}

	return items
}

const svelteRawModules = import.meta.glob<string>('/src/content/svelte.dev/**/*.md', {
	eager: true,
	import: 'default',
	query: '?raw',
})

const svelteModules = import.meta.glob<RawMd>('/src/content/svelte.dev/**/*.md', {
	eager: true,
})

const sveltePatternsRawModules = import.meta.glob<string>(
	'/src/content/sveltepatterns.dev/**/*.md',
	{
		eager: true,
		import: 'default',
		query: '?raw',
	},
)

const sveltePatternsModules = import.meta.glob<RawMd>('/src/content/sveltepatterns.dev/**/*.md', {
	eager: true,
})

const searchIndex = [
	...buildSearchIndex(svelteRawModules, svelteModules, getSvelteDevSlug),
	...buildSearchIndex(sveltePatternsRawModules, sveltePatternsModules, getSveltePatternsDevSlug),
]

export const load = async () => {
	return { items: searchIndex }
}
