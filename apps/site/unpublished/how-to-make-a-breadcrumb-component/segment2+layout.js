import { breadcrumbKey } from '$lib/Breadcrumb.svelte'

const getClassName = () => {
	return 'North Star'
}

export const load = () => {
	return { [breadcrumbKey()]: getClassName() }
}
