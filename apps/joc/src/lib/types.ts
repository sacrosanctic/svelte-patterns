export type Categories = 'sveltekit' | 'svelte'

export type Frontmatter = {
	title: string
	description: string
	date: string
	categories: Categories[]
}

export type Post = {
	slug: string
	frontmatter: Frontmatter
}
