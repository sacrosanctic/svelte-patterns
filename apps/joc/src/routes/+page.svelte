<script lang="ts">
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'
	import { resolve } from '$app/paths'

	let { data } = $props()
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<section>
	<ul class="grid gap-7">
		{#each data.posts as post (post)}
			<li class="max-w-prose not-last:border-b not-last:border-border not-last:pb-7">
				<a href={resolve('/[slug]', post)} class="block text-3xl capitalize"
					>{post.frontmatter.title}</a
				>
				<!-- <p class="text-secondary">{formatDate(post.date)}</p> -->
				<p class="description mt-3">{post.frontmatter.description}</p>
			</li>
		{/each}
	</ul>
</section>
