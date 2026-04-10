<script lang="ts">
	import { resolve } from '$app/paths'

	import { GITHUB_REPO_URL } from '$lib/config/constants'

	import IconArrowRight from '~icons/mdi/arrow-right'
	import IconGithub from '~icons/mdi/github'
</script>

<svelte:head>
	<title>Svelte Patterns — Complementary docs for Svelte</title>
	<meta
		name="description"
		content="Common patterns, best practices, and reusable abstractions for Svelte and SvelteKit that the official docs don't cover."
	/>
</svelte:head>

<div class="flex min-h-[calc(100dvh-4rem)] flex-col">
	<section
		class="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24 text-center sm:py-28"
	>
		<div
			class="pointer-events-none absolute top-1/3 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-[120px]"
			style="background: var(--primary)"
			aria-hidden="true"
		></div>

		<h1
			class="relative max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
		>
			Complementary docs for
			<span class="bg-linear-to-r from-primary to-primary-hover bg-clip-text text-transparent"
				>Svelte & SvelteKit</span
			>
		</h1>

		<p class="mt-12 max-w-2xl text-lg text-balance text-muted-foreground sm:text-xl">
			Common patterns, best practices, and reusable abstractions that the official docs don't cover.
			An extension of
			<a
				href="https://svelte.dev/docs/"
				target="_blank"
				rel="noopener noreferrer external"
				class="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition hover:text-primary-hover hover:decoration-primary"
				>svelte.dev</a
			>.
		</p>

		<div class="mt-10 flex flex-wrap items-center justify-center gap-4">
			<a
				href={resolve('/introduction')}
				class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover"
			>
				Look inside
				<IconArrowRight class="size-4" aria-hidden="true" />
			</a>

			<a
				href={GITHUB_REPO_URL}
				target="_blank"
				rel="noopener noreferrer external"
				class="inline-flex items-center gap-2 rounded-lg border bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-muted"
			>
				<IconGithub class="size-4" aria-hidden="true" />
				GitHub
			</a>
		</div>
	</section>

	<footer class="border-t px-6 py-8 text-center text-sm text-muted-foreground">
		<p>
			Built with
			<a
				href="https://svelte.dev/docs/kit/introduction"
				target="_blank"
				rel="noopener noreferrer external"
				class="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition hover:text-primary-hover hover:decoration-primary"
				>SvelteKit</a
			>
			&middot;
			<a
				href={GITHUB_REPO_URL}
				target="_blank"
				rel="noopener noreferrer external"
				class="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition hover:text-primary-hover hover:decoration-primary"
				>Contribute on GitHub</a
			>
		</p>
	</footer>
</div>
