<script lang="ts">
	import { resolve } from '$app/paths'

	let { data } = $props()
</script>

<a href={resolve('/')}>back</a>

<data.component />
