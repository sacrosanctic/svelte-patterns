import { getDoc } from '$lib/utils/docs.js'

export async function load({ params, fetch }) {
	return await getDoc(params.slug || 'index', fetch)
}
