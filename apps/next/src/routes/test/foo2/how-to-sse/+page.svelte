<script>
	import { onMount } from 'svelte'

	const messages = $state([])
	let connection = $state()

	const stop = () => {
		connection.close()
		connection = undefined
	}

	onMount(() => {
		connection = new EventSource('/sse')
		connection.onmessage = (e) => messages.push(JSON.parse(e.data))
		connection.onerror = stop

		return stop
	})
</script>

<p>Stops when a user clicks the button or after 10 events.</p>

<button onclick={stop} disabled={!connection}> Stop Connection </button>

<ol>
	{#each messages as message}
		<li>{new Date(message.time)}</li>
	{/each}
</ol>
