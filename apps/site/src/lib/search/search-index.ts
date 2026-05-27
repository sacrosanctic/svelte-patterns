export type SearchItem = {
	id: string
	content: string
	kind: 'docs' | 'patterns'
	slug: string
	title: string
}

type RawMd = {
	default: unknown
	frontmatter: Record<string, unknown>
}

const stripMarkdown = (content: string) =>
	content
		.replace(/^---[\s\S]*?---\s*/g, '')
		.replace(/```[\s\S]*?```/g, '')
		.replace(/`([^`]+)`/g, '$1')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/^#+\s+.+$/gm, '')
		.replace(/[*_~>]/g, '')
		.replace(/^\s*[-*+]\s+/gm, '')
		.replace(/^\s*\d+\.\s+/gm, '')
		.replace(/\n{3,}/g, '\n\n')
		.trim()

const normalizeSlug = (name: string) =>
	name
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '')

const titleFromRawMarkdown = (raw: string, fallback: string) => {
	const frontmatterTitle = raw.match(/^---[\s\S]*?\ntitle:\s*['"]?(.+?)['"]?\s*\n[\s\S]*?---/)
	const headingTitle = raw.match(/^#\s+(.+)$/m)
	const title = frontmatterTitle?.[1] ?? headingTitle?.[1] ?? fallback

	return title.trim()
}

const getDocsSlug = (globPath: string) =>
	globPath
		.replace('/src/content/svelte.dev/docs/', '')
		.replace(/(\/index)?\.md$/, '')
		.replace(/^index$/, '')

const getPatternSlug = (globPath: string) => {
	const parts = globPath.split('/')
	const filename = parts.pop()?.replace('.md', '') ?? ''
	const name = filename === 'index' ? (parts.pop() ?? filename) : filename

	return normalizeSlug(name)
}

const buildSearchItems = (
	rawModules: Record<string, string>,
	modules: Record<string, RawMd>,
	kind: SearchItem['kind'],
	getSlug: (path: string) => string,
): SearchItem[] => {
	const items: SearchItem[] = []

	for (const [globPath, raw] of Object.entries(rawModules)) {
		const slug = getSlug(globPath)

		if (!slug) continue

		const md = modules[globPath]
		const title =
			typeof md?.frontmatter?.title === 'string'
				? md.frontmatter.title
				: titleFromRawMarkdown(raw, slug)

		items.push({
			id: `${kind}:${slug}`,
			content: stripMarkdown(raw),
			kind,
			slug,
			title,
		})
	}

	return items
}

const docsRawModules = import.meta.glob<string>('/src/content/svelte.dev/docs/**/*.md', {
	eager: true,
	import: 'default',
	query: '?raw',
})

const docsModules = import.meta.glob<RawMd>('/src/content/svelte.dev/docs/**/*.md', {
	eager: true,
})

const patternRawModules = import.meta.glob<string>('/src/content/sveltepatterns.dev/**/*.md', {
	eager: true,
	import: 'default',
	query: '?raw',
})

const patternModules = import.meta.glob<RawMd>('/src/content/sveltepatterns.dev/**/*.md', {
	eager: true,
})

export const searchIndex = [
	...buildSearchItems(patternRawModules, patternModules, 'patterns', getPatternSlug),
	...buildSearchItems(docsRawModules, docsModules, 'docs', getDocsSlug),
].sort((a, b) => {
	const title = a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
	if (title !== 0) return title

	return a.slug.localeCompare(b.slug)
})
