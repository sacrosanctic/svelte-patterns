<script>
	import InfiniteList from './InfiniteList.svelte'

	let { data } = $props()
</script>

<InfiniteList data={data.fruits} index={data.offset}></InfiniteList>
