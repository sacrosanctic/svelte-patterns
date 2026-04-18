<script>
	const STATES = [
		{ text: 'unchecked', checked: false, indeterminate: false },
		{ text: 'checked', checked: true, indeterminate: false },
		{ text: 'indeterminate', checked: false, indeterminate: true },
	]

	let index = $state({ current: 0 })
	const { text, checked, indeterminate } = $derived(STATES[index.current])
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
