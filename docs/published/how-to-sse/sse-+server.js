export const GET = () => {
	const iterator = generateData()
	return new Response(createStream(iterator), {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive',
		},
	})
}

const createStream = (iterator) =>
	new ReadableStream({
		async pull(controller) {
			const { value, done } = await iterator.next()

			if (done) return controller.close()
			controller.enqueue(`data: ${JSON.stringify(value)}\n\n`)
		},
		cancel() {
			iterator.return?.()
		},
	})

async function* generateData() {
	// limit to 10 events
	for (let i = 0; i < 10; i++) {
		// limit events to 1 per second
		await new Promise((r) => setTimeout(r, 1000))

		yield { time: new Date() }
	}
}
