export const load = async ({ isDataRequest }) => {
	const slowPromise = getSlowData()
	return {
		slow: isDataRequest ? slowPromise : await slowPromise,
	}
}

const getSlowData = async () => {
	await delay(3000)
	return '😴'
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms))
