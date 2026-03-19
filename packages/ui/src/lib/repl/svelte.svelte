<script lang="ts" module>
	import type { Repl } from './types.js'

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

	const createHash = ({ name, files }: Repl): Promise<string> => {
		const obj = {
			name,
			files: files.map(({ contents, name }) => {
				return {
					type: 'file',
					text: true,
					name,
					contents,
					basename: name,
				}
			}),
		}
		return compress_and_encode_text(JSON.stringify(obj))
	}
</script>

<script lang="ts">
	import type { ClassValue } from 'svelte/elements'

	let {
		value = 'playground',
		class: className,
		...rest
	}: Repl & { value: string; class: ClassValue } = $props()
</script>

<span class={className}>
	{#await createHash(rest)}
		{value}
	{:then result}
		<a
			target="_blank"
			rel="noopener noreferrer"
			href="https://svelte.dev/playground/hello-world#{result}">{value}</a
		>
	{/await}
</span>
