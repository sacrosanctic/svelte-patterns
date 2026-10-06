<script lang="ts">
	import { page } from '$app/state'

	let { children } = $props()
</script>

<h1>{page.data.md.fm.title}</h1>

{@render children()}
