import { db } from './db.js'

const LIMIT = 5

export const load = async ({ url }) => {
	const offset = Number(url.searchParams.get('offset')) ?? 0

	await delay(500)

	return {
		fruits: getFruits(offset, LIMIT),
		offset,
	}
}

const getFruits = (offset, limit) => {
	return db.slice(offset, offset + limit)
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms))
