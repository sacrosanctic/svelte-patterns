<script lang="ts">
	import { afterNavigate } from '$app/navigation'
	import { page } from '$app/state'

	import Sidebar, { sidebar } from '$lib/sidebar.svelte'

	import Anchor from './anchor.svelte'

	import IconPencil from '~icons/mdi/pencil-outline'
	import { MediaQuery } from 'svelte/reactivity'

	let { children } = $props()

	let isDesktop = new MediaQuery('min-width: 768px', false)

	afterNavigate(() => {
		sidebar.current = false
	})
</script>

<Anchor />

<div class="flex h-[calc(100dvh-4rem)] min-h-0 w-full flex-col overflow-hidden md:flex-row">
	{#if sidebar.current}
		<button
			type="button"
			class="fixed inset-x-0 top-16 bottom-0 z-30 bg-black/40 md:hidden"
			aria-label="Close documentation menu"
			onclick={() => (sidebar.current = false)}
		></button>
	{/if}

	<nav
		id="docs-sidebar-nav"
		class={[
			'fixed top-16 bottom-0 left-0 z-40 min-h-0 w-[min(92vw,24rem)] overflow-y-auto overscroll-y-contain border-r border-border bg-muted transition-transform duration-200 ease-out',
			'md:static md:z-auto md:h-full md:w-sm md:max-w-none md:shrink-0 md:translate-x-0 md:transform-none',
			sidebar.current ? 'translate-x-0' : '-translate-x-full',
		]}
		aria-label="Documentation"
		inert={!isDesktop.current && !sidebar.current}
	>
		{#if page.data.sidebar}
			<Sidebar {...page.data.sidebar} />
		{/if}
	</nav>

	<main
		id="main-content"
		tabindex="-1"
		class="min-h-0 min-w-0 flex-1 overflow-y-scroll overscroll-y-contain"
	>
		<article
			class={[
				'mx-auto max-w-prose px-4 py-8 md:px-6 lg:px-8',
				'prose sm:prose-sm md:prose-base lg:prose-lg xl:prose-xl',
				'prose-a:text-primary prose-a:decoration-primary/30 hover:prose-a:decoration-primary',
				'prose-inline-code:rounded prose-inline-code:outline prose-inline-code:outline-border prose-code:before:content-none prose-code:after:content-none',
				'prose-pre:border prose-pre:border-border',
				'dark:prose-invert',
			]}
		>
			{@render children()}
		</article>

		{#if page.data.editUrl}
			<div class="pb-12 pl-12">
				<hr class="border-border" />
				<a
					href={page.data.editUrl}
					target="_blank"
					rel="noopener noreferrer external"
					class="mt-6 inline-flex items-center gap-1.5 text-sm text-primary transition hover:text-primary-hover"
				>
					<IconPencil class="size-4" aria-hidden="true" />
					Edit this page on GitHub
				</a>
			</div>
		{/if}
	</main>
</div>
