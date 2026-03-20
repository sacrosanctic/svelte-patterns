<script lang="ts">
	type Props = {
		src: string
		alt: string
	}

	let { src, alt }: Props = $props()
</script>

{#if src.startsWith('$') || src.startsWith('/')}
	<enhanced:img {src} {alt} loading="lazy" />
{:else}
	<img {src} {alt} loading="lazy" />
{/if}

<style>
	img[src$='.svg'] {
		filter: invert(50%);
	}
</style>
