<script>
	import Grandchild from './Grandchild.svelte'

	let { text, color } = $props()
</script>

<Grandchild {text} {color} />
