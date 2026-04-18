<script>
	class Tristate {
		#STATES = [
			{ text: 'unchecked', checked: false, indeterminate: false },
			{ text: 'checked', checked: true, indeterminate: false },
			{ text: 'indeterminate', checked: false, indeterminate: true },
		]
		#index = $state(0)
		#current = $derived(STATES[index])

		get current() {
			return this.#current
		}

		next() {
			this.#index = (this.#index + 1) % 3
		}
	}

	const tristate = new Tristate()
	const { text, checked, indeterminate } = $derived(tristate)
</script>

<label>
	<input
		type="checkbox"
		data-state={index}
		onclick={() => (index = (index + 1) % 3)}
		{checked}
		{indeterminate}
	/>
	{text}
</label>
