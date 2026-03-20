<script lang="ts">
	// Glob import all Markdown images
	const imageModules = import.meta.glob(
		'$lib/content /*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
		{
			eager: true,
			query: {
				enhanced: true,
			},
		},
	) as Record<string, { default: string }>

	const { src, alt, ...restProps } = $props()

	// Find the image module that matches the src
	const matchingPath = Object.keys(imageModules).find((path) => path.endsWith(src))
	const image = matchingPath ? imageModules[matchingPath].default : undefined
</script>

<pre>{JSON.stringify(src, null, 2)}</pre>

{#if image}
	<!-- Render the image with the enhanced-img plugin -->
	<enhanced:img src={image} {alt} {...restProps} />
{:else}
	<img {src} {alt} {...restProps} />
{/if}
