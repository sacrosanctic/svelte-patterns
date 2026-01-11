<script module>
	import { getContext, setContext } from 'svelte'

	export const getUserContext = () => getContext(key)
</script>

<script>
	let { children: fallback } = $props()

	let dialog
	let children = $state()
	const key = {}

	export const open = (snippet) => {
		children = snippet
		dialog.showModal()
	}
	export const close = () => {
		dialog.close()
	}

	setContext(key, { open, close })
</script>

<dialog bind:this={dialog}>
	{@render (children ?? fallback)?.(close)}
</dialog>
