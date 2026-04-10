<script lang="ts">
	import type { LayoutProps } from './$types'

	import { afterNavigate } from '$app/navigation'
	import { page } from '$app/state'

	import Sidebar from '$lib/sidebar.svelte'

	import Anchor from './anchor.svelte'

	import { MediaQuery } from 'svelte/reactivity'

	let { children }: LayoutProps = $props()

	let sidebar = $state(false)
	let isDesktop = new MediaQuery('min-width: 768px', false)

	afterNavigate(() => {
		sidebar = false
	})
</script>

<Anchor />

<div class="flex h-dvh min-h-0 w-full flex-col overflow-hidden md:flex-row">
	<div
		class="flex shrink-0 items-center justify-between border-b border-border px-4 py-3 md:hidden"
	>
		<button
			type="button"
			class={[
				'rounded-md border border-border px-3 py-2 text-sm font-medium shadow-sm transition',
				'bg-background text-foreground hover:bg-muted',
			]}
			aria-controls="docs-sidebar-nav"
			aria-expanded={sidebar}
			onclick={() => {
				sidebar = !sidebar
			}}
		>
			Documentation menu
		</button>
	</div>

	{#if sidebar}
		<button
			type="button"
			class="fixed inset-0 z-30 bg-black/40 md:hidden"
			aria-label="Close documentation menu"
			onclick={() => {
				sidebar = false
			}}
		></button>
	{/if}

	<nav
		id="docs-sidebar-nav"
		class={[
			'fixed inset-y-0 left-0 z-40 min-h-0 w-[min(92vw,24rem)] overflow-y-auto overscroll-y-contain border-r border-border bg-muted transition-transform duration-200 ease-out',
			'md:static md:z-auto md:h-full md:w-sm md:max-w-none md:shrink-0 md:translate-x-0 md:transform-none',
			sidebar ? 'translate-x-0' : '-translate-x-full',
		]}
		aria-label="Documentation"
		inert={!isDesktop.current && !sidebar}
	>
		{#if page.data.sidebar}
			<Sidebar groups={page.data.sidebar.groups} />
		{/if}
	</nav>

	<main class="min-h-0 min-w-0 flex-1 overflow-y-scroll overscroll-y-contain">
		<article
			class={[
				'mx-auto max-w-prose px-4 py-8 md:px-6 lg:px-8',
				'dark:prose-invert',
				'prose sm:prose-sm md:prose-base lg:prose-lg xl:prose-xl',
				'prose-a:text-primary prose-a:decoration-primary/30 hover:prose-a:decoration-primary',
				'prose-inline-code:rounded prose-inline-code:outline prose-inline-code:outline-border prose-code:before:content-none prose-code:after:content-none',
				'prose-pre:border prose-pre:border-border',
			]}
		>
			{@render children()}
		</article>
	</main>
</div>
