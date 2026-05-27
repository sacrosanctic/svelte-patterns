<script lang="ts">
	import { resolve } from '$app/paths'
	import { page } from '$app/state'

	import favicon from '$lib/assets/favicon.svg'
	import { GITHUB_REPO_URL, SVELTE_DOCS_URL } from '$lib/config/constants'
	import DesktopSearchTrigger from '$lib/navbar/desktop-search-trigger.svelte'
	import ModeToggle from '$lib/navbar/mode-toggle.svelte'
	import { searchDialog } from '$lib/search/search-state.svelte'
	import { sidebar } from '$lib/sidebar.svelte'

	import IconClose from '~icons/mdi/close'
	import IconGithub from '~icons/mdi/github'
	import IconSearch from '~icons/mdi/magnify'
	import IconMenu from '~icons/mdi/menu'
</script>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
>
	Skip to content
</a>

<header
	class="sticky top-0 z-50 flex h-16 shrink-0 items-center border-b bg-background/80 backdrop-blur-md"
>
	<div class="flex h-full shrink-0 items-center gap-3 pl-6 lg:pl-8">
		{#if page.data.sidebar}
			<button
				type="button"
				class="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground md:hidden"
				aria-label={sidebar.current ? 'Close sidebar' : 'Open sidebar'}
				aria-controls="docs-sidebar-nav"
				aria-expanded={sidebar.current}
				onclick={() => sidebar.toggle()}
			>
				{#if sidebar.current}
					<IconClose class="size-5" aria-hidden="true" />
				{:else}
					<IconMenu class="size-5" aria-hidden="true" />
				{/if}
			</button>
		{/if}

		<a
			href={resolve('/')}
			class="text-base font-semibold text-foreground transition hover:text-primary"
		>
			Svelte Patterns
		</a>
	</div>

	<div class="flex flex-1 items-center gap-4 pr-8 pl-5 lg:pr-12">
		<div class="hidden sm:block">
			<DesktopSearchTrigger />
		</div>

		<div class="flex-1"></div>

		<!-- Mobile search trigger -->
		<button
			type="button"
			class="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground sm:hidden"
			aria-label="Search"
			onclick={() => searchDialog.open()}
		>
			<IconSearch class="size-5" aria-hidden="true" />
		</button>

		<ModeToggle />

		<a
			href={SVELTE_DOCS_URL}
			target="_blank"
			rel="noopener noreferrer external"
			class="inline-flex size-9 items-center justify-center rounded-md transition hover:bg-muted"
			aria-label="Svelte documentation (opens in new tab)"
		>
			<img src={favicon} alt="" class="size-5" style:filter="none" />
		</a>

		<a
			href={GITHUB_REPO_URL}
			target="_blank"
			rel="noopener noreferrer external"
			class="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
			aria-label="GitHub repository (opens in new tab)"
		>
			<IconGithub class="size-5" aria-hidden="true" />
		</a>
	</div>
</header>
