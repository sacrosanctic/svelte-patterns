import type { RawMd } from '$lib/content'

export const load = async () => {
	const modules = import.meta.glob<RawMd>(`/src/content/**/*.md`)
	type Thing = { slug: string; title: string }
	const flatItems: Thing[] = []

	for (const [path, resolver] of Object.entries(modules)) {
		try {
			const md = await resolver()
			// if(!md.frontmatter.title) continue

			const name = path
				.replace(/^\/src\/content\//, '')
				.replace(/\.md$/, '')
				.replace(/\/index$/, '')
			const slug = name
				.toLowerCase() // lowercase
				.replace(/\s+/g, '-') // spaces → hyphens
				.replace(/[^a-z0-9-]/g, '') // strip non-alphanumeric chars (keep a-z, 0-9, -)
				.replace(/-+/g, '-') // collapse consecutive hyphens
				.replace(/^-|-$/g, '') // trim leading/trailing hyphens

			const { title } = md.frontmatter
			// const { disabled, external, label, title } = doc.metadata
			// const item: NavItem = {
			// 	disabled,
			// 	external,
			// 	href,
			// 	label,
			// 	title,
			// }
			const item = { slug, title: title ?? name } satisfies Thing

			flatItems.push(item)
		} catch (e) {
			console.error(`Error processing ${path}:`, e)
		}
	}

	return { items: flatItems }
}
