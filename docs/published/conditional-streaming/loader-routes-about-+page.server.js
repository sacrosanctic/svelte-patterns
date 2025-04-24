import { getRequestEvent } from '$app/server'

export const load = async () => {
	// Mock a network request
	const promise = getData()

	const result = await Promise.race([delay(200), promise])

	return {
		promise: result ?? promise,
	}
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

const getData = async () => {
	const { url } = getRequestEvent()

	// for repeatable testing
	const ms = Number(url.searchParams.get('delay'))
	await delay(ms)

	// for realistic network delay
	// await delay(Math.random() < 0.5 ? 50 : 3000)

	return '😴'
}
