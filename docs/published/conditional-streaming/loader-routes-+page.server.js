export const load = async () => {
	const slowData = getSlowData()
	const result = await Promise.race([delay(200), slowData])

	return {
		slow: result ?? slowData,
	}
}

const getSlowData = async () => {
	await delay(Math.random() < 0.5 ? 50 : 3000)
	return '😴'
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms))
