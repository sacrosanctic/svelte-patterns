<script lang="ts" module>
	// https://github.com/sveltejs/svelte.dev/blob/3bc1aca0060f114684f351c18d0e3c62adfd3807/apps/svelte.dev/src/routes/(authed)/playground/%5Bid%5D/gzip.js#L1-L17

	const compress_and_encode_text = async (input: string): Promise<string> => {
		const reader = new Blob([input]).stream().pipeThrough(new CompressionStream('gzip')).getReader()
		let buffer = ''
		for (;;) {
			const { done, value } = await reader.read()
			if (done) {
				reader.releaseLock()
				return btoa(buffer).replaceAll('+', '-').replaceAll('/', '_')
			} else {
				for (let i = 0; i < value.length; i++) {
					// decoding as utf-8 will make btoa reject the string
					buffer += String.fromCharCode(value[i])
				}
			}
		}
	}
</script>

<script lang="ts">
	type Props = {
		name?: string
		files: { name: string; contents: string }[]
	}

	let props: Props = $props()
	let hash = $state('')

	const data = {
		name: props.name,
		files: props.files.map(({ contents, name }) => {
			return { type: 'file', text: true, name, contents, basename: name }
		}),
	}

	compress_and_encode_text(JSON.stringify(data)).then((_) => (hash = _))
</script>

{#if hash}
	<a
		target="_blank"
		rel="noopener noreferrer"
		href="https://svelte.dev/playground/hello-world#{hash}">Svelte Playground</a
	>
{/if}
