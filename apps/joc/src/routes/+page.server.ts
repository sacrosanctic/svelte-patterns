import { allPosts } from '$lib/content'

export async function load() {
	const posts = allPosts.sort(
		(a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
	)
	return { posts }
}
