<script lang="ts">
	import Anchor from './anchor.svelte'

	let { children } = $props()
</script>

<Anchor />
{@render children()}
