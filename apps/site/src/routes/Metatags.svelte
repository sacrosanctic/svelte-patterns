<script lang="ts">
	import { page } from '$app/state'
	import { MetaTags } from 'svelte-meta-tags'
	import { deepmergeCustom } from 'deepmerge-ts'

	const deepmerge = deepmergeCustom({ mergeArrays: (values) => values.at(-1) })
</script>

<MetaTags {...deepmerge(page.data.baseMetaTags ?? {}, page.data.pageMetaTags ?? {})} />
