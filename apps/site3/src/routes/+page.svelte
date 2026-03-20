<script lang="ts">
	import { resolve } from '$app/paths'

	let { data } = $props()
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>

<ul class="flex flex-col">
	{#each data.items as { slug, title } (slug)}
		<li>
			<a href={resolve('/[...slug]', { slug })}>{title}</a>
		</li>
	{/each}
</ul>
