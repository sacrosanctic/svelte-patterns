import type { Component } from 'svelte'
import type { Frontmatter, Post } from './types.ts'

function extractSlugFromPath(path: string): string {
	const parts = path.split('/')
	return parts.at(-1) === 'index.md' //
		? parts.at(-2)!
		: parts.at(-1)!.replace('.md', '')
}

// Load all markdown files at build time (static analysis)
const postModules = import.meta.glob('/src/posts/**/*.md', { eager: true }) as Record<
	string,
	{
		default: Component
		metadata: Frontmatter
	}
>

// Create and initialize lookup map for O(1) access
export const posts = new Map(
	Object.entries(postModules).map(([path, module]) => [
		extractSlugFromPath(path),
		{
			content: module.default,
			frontmatter: module.metadata,
		},
	]),
)

export const allPosts: Post[] = Array.from(posts.entries()).map(([slug, { frontmatter }]) => ({
	frontmatter,
	slug,
}))
