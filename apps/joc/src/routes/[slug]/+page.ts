import { posts } from '$lib/content.js'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
	const post = posts.get(params.slug)
	if (!post) error(404, `Could not find ${params.slug}`)

	return post
}
