<script>
	import { untrack } from 'svelte'
	import { goto } from '$app/navigation'

	const intersectionObserver = (node, callback) => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) callback()
			},
			{ threshold: 1.0 },
		)

		$effect(() => {
			observer.observe(node)
			return () => observer.disconnect()
		})
	}

	let { data, index, children } = $props()

	// internal list of items
	let list = $state(data)

	// tracks the fetched data range
	let start = $state(index)
	let end = $state(index + data.length)

	let hasMounted = $state(false)

	$effect(() => {
		// prevent init run onMount
		if (!hasMounted) {
			hasMounted = true
			return
		}

		void data

		untrack(() => {
			if (index + data.length <= start) {
				// Prepend
				start = index
				list.unshift(...data)
			} else if (index >= end) {
				// Append
				end = index + data.length
				list.push(...data)
			}
		})
	})
</script>

{#if start !== 0}
	<a href="?offset={start - data.length}"> Load prev </a>
{/if}

<ul>
	{#each list as fruit}
		{#if children}
			{@render children(fruit)}
		{:else}
			<!-- ensure the intersection observer is offscreen -->
			<li style="height:25vh;border:1px solid blue">
				{fruit.name}
			</li>
		{/if}
	{/each}
</ul>

<a
	use:intersectionObserver={() => goto(`?offset=${end}`, { noScroll: true })}
	style="border: 1px solid red;width:100%"
	href="?offset={end}"
>
	Load next
</a>
