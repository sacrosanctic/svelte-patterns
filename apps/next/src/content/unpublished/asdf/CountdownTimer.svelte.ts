import { createSubscriber } from 'svelte/reactivity'

export class CountdownTimer {
	#count: number
	#interval: NodeJS.Timeout | undefined

	constructor(count: number) {
		this.#count = $state(count)
	}

	get current() {
		this.#subscribe()
		return this.#count
	}
	#subscribe = createSubscriber((update) => {
		this.#clear()
		const tick = () => (--this.#count === 0 ? this.#clear() : update())
		this.#interval = setInterval(tick, 1000)

		return () => this.#clear()
	})

	#clear = () => {
		if (this.#interval) {
			clearInterval(this.#interval)
			this.#interval = undefined
		}
	}
}
