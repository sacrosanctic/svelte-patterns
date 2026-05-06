<script module>
	const BREADCRUMB_KEY = 'breadcrumbs_'

	// a bit hacky
	const getCallerFile = () => {
		const err = new Error()
		const stack = err.stack?.split('\n')
		if (!stack) return undefined

		// This index may need tweaking depending on environment
		const callerLine = stack[3] || ''
		const match = callerLine.match(/\((.*):\d+:\d+\)/)
		return match?.[1]
	}

	const getLabel = (urlSegment) => {
		const match = Object.entries(page.params).find(
			([paramName, paramValue]) =>
				paramValue === urlSegment && page.data[BREADCRUMB_KEY + paramName],
		)

		return match ? page.data[BREADCRUMB_KEY + match[0]] : urlSegment
	}

	export const breadcrumbKey = () => {
		const key = getCallerFile().split('/').at(-2)?.slice(1, -1)

		return `${BREADCRUMB_KEY}${key}`
	}
</script>

<script>
	import { page } from '$app/state'

	const breadcrumbs = $derived.by(() => {
		if (page.url.pathname === '/') return [{ href: '/', label: 'home' }]

		let href = ''

		const obj = page.url.pathname.split('/').map((segment, i) => {
			if (i === 0) return { href: '/', label: 'home' }

			return {
				href: (href += `/${segment}`),
				label: getLabel(segment),
			}
		})

		return obj
	})
</script>

<div>
	{#each breadcrumbs as { href, label }, i}
		{@const isLastSegment = i === breadcrumbs.length - 1}
		{#if isLastSegment}
			{label}
		{:else}
			<a {href}>{label}</a> &gt;&nbsp;
		{/if}
	{/each}
</div>
