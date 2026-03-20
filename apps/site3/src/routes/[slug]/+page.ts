import { contentMap } from '$lib/content'

export const load = async ({ params }) => {
	return contentMap[params.slug]
}
