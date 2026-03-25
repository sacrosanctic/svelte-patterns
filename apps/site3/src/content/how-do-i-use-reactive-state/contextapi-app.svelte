<script>
	import { setContext } from 'svelte'
	import Child from './Child.svelte'

	let text = $state('https://example.com')
	let color = $state('#000000')

	setContext('options', {
		getText: () => text,
		getColor: () => color,
	})
</script>

<Child />

<hr />

<label>
	Enter a URL
	<input bind:value={text} />
</label>

<br />

<label>
	Choose a color
	<input type="color" bind:value={color} />
</label>
