<script lang="ts">
	let { children } = $props();
</script>

<span style="border:red solid 1px">
	{@render children()}
</span>
