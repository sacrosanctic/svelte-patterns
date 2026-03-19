<script lang="ts">
	import favicon from '$lib/assets/favicon.svg'

	import { ModeWatcher } from 'mode-watcher'

	import './layout.css'

	let { children } = $props()
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />
<article
	class={[
		'mx-auto max-w-prose',
		'prose-blue dark:prose-invert',
		'prose sm:prose-sm md:prose-base lg:prose-lg xl:prose-xl',
		'prose-inline-code:rounded prose-inline-code:outline prose-inline-code:outline-stone-400 prose-code:before:content-none prose-code:after:content-none',
		'prose-pre:border dark:prose-pre:border-neutral-700',
	]}
>
	{@render children()}
</article>
