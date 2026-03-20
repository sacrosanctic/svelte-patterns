<script>
	import { page } from '$app/state'

	let { title, description } = $props()
</script>

<header class="mb-4 border-b border-gray-200 pb-2 sm:mb-4 sm:pb-6 dark:border-neutral-700">
	{#if page.params.slug}
		<p class="text-primary mb-2 text-sm font-semibold capitalize">
			{page.params.slug
				.replace(/-/g, ' ')
				.replace(/\b\w/g, (char) => char.toUpperCase())
				.replace('/', ': ')}
		</p>
	{:else}
		<p class="text-primary mb-2 text-sm font-semibold capitalize">Docs</p>
	{/if}
	<h1 class="mb-2 block text-2xl font-bold sm:text-3xl">
		{title}
	</h1>
	<p class="mt-2 text-gray-800 sm:text-lg dark:text-neutral-400">
		{description}
	</p>
</header>
