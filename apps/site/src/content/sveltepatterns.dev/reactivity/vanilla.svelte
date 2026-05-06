<label>
	<input
		type="checkbox"
		data-state="0"
		onclick={(e) => {
			const STATES = [
				{ text: 'unchecked', checked: false, indeterminate: false },
				{ text: 'checked', checked: true, indeterminate: false },
				{ text: 'indeterminate', checked: false, indeterminate: true },
			]

			const index = (Number(this.dataset.state) + 1) % 3
			this.dataset.state = index
			const currentState = STATES[index]

			this.checked = currentState.checked
			this.indeterminate = currentState.indeterminate
			this.nextSibling.textContent = currentState.text
		}}
	/>
	unchecked
</label>
