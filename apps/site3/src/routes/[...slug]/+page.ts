import { getDoc } from '$lib/content'

import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
	const result = getDoc(params.slug)

	if (result.error) {
		const { name } = result.error
		switch (name) {
			case 'DocNotFound':
				error(404)
				break
			case 'Unexpected':
				error(500)
				break
			default:
				console.log(name satisfies never)
				error(500)
		}
	}

	return { component: result.data.component }
}
