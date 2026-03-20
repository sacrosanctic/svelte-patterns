<script lang="ts">
	import { formatDate } from '$lib/utils'

	let { data } = $props()
</script>

<svelte:head>
	<title>{data.frontmatter.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.frontmatter.title} />
</svelte:head>

<article
	class={[
		'mx-auto max-w-prose',
		'prose-blue dark:prose-invert',
		'prose sm:prose-sm md:prose-base lg:prose-lg xl:prose-xl',
		'prose-inline-code:rounded prose-inline-code:outline prose-inline-code:outline-stone-400 prose-code:before:content-none prose-code:after:content-none',
		'prose-pre:border dark:prose-pre:border-neutral-700',
	]}
>
	<hgroup>
		<h1 class="mb-0! capitalize">{data.frontmatter.title}</h1>
		<p class="my-0! opacity-50">{data.frontmatter.description}</p>
		<!-- <p class="mt-2 text-secondary">Published at {formatDate(data.frontmatter.date)}</p> -->
	</hgroup>

	<div class="mt-7 flex gap-3">
		{#each data.frontmatter.categories as category (category)}
			<span class="rounded-full px-3 py-2 dark:bg-stone-600">&num;{category}</span>
		{/each}
	</div>

	<div>
		<data.content />
	</div>
</article>
