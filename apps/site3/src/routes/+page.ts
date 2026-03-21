type SearchItem = { content: string; slug: string; title: string }

const slugFromPath = (path: string) => {
	const name = path
		.replace(/^\/src\/content\//, '')
		.replace(/\.md$/, '')
		.replace(/\/index$/, '')
	return name
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '')
}

const extractTitle = (content: string, fallback: string) => {
	const match = content.match(/^#\s+(.+)$/m)
	return match ? match[1] : fallback
}

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

export const load = async () => {
	const modules = import.meta.glob<string>(`/src/content/**/*.md`, {
		eager: true,
		import: 'default',
		query: '?raw',
	})

	const items: SearchItem[] = []

	for (const [path, content] of Object.entries(modules)) {
		try {
			const slug = slugFromPath(path)
			const fallback = slug
				.split('-')
				.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
				.join(' ')
			const title = extractTitle(content, fallback)
			const stripped = stripMarkdown(content)

			items.push({ content: stripped, slug, title })
		} catch (e) {
			console.error(`Error processing ${path}:`, e)
		}
	}

	return { items }
}
