import { buildEditUrl } from '$lib/content'

export const load = () => ({
	editUrl: buildEditUrl('/src/routes/(markdown)/introduction/+page.md'),
})
