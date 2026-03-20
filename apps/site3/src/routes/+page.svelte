<script lang="ts">
	import { resolve } from '$app/paths'

	let { data } = $props()
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>

<ul class="flex flex-col">
	{#each Object.entries(data.contentMap) as [slug, { name, frontmatter }] (slug)}
		<li>
			<a href={resolve('/[slug]', { slug })}>{frontmatter?.title ?? name}</a>
		</li>
	{/each}
</ul>
