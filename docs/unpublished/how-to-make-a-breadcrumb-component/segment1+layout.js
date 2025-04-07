import { breadcrumbKey } from '$lib/Breadcrumb.svelte'

const getSchoolName = () => {
	return 'Svelte School'
}

export const load = () => {
	return { [breadcrumbKey()]: getSchoolName() }
}
