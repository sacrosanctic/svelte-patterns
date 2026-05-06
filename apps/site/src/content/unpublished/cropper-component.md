---
title: Cropper Component
publish: false
tags:
---

This demo showcases an image cropping feature with the following aspects:

- **Frontend**:

  - **`svelte-easy-crop` package**: A Svelte component for interactive image cropping.

- **Backend**:
  - **`sharp` package**: A high-performance Node.js image processing library used for extracting the cropped portion of the image.
  - **Image fetching and processing**: Fetches the image from a URL, crops it according to the provided coordinates, and returns the cropped image.
  - **Image download**: The cropped image is sent back to the client with appropriate headers to initiate a download.

## Describe the problem

::: code-group

```svelte [+page.svelte]
<script lang="ts">
	import Cropper from 'svelte-easy-crop'

	let image = 'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'
	let cropPixels = $state({ x: 0, y: 0, width: 0, height: 0 })
</script>

<div class="hello" style="position: relative; width: 500px; height: 500px;">
	<Cropper {image} oncropcomplete={(e) => (cropPixels = e.pixels)} />
</div>

<form action="/crop" method="post">
	<input type="hidden" name="image" value={image} />
	<input type="hidden" name="crop" value={JSON.stringify(cropPixels)} />
	<button type="submit">crop and download</button>
</form>
```

```ts [+server.ts]
import sharp from 'sharp'

export const POST = async ({ request }) => {
	const formData = await request.formData()
	const imageUrl = formData.get('image') as string
	const cropString = formData.get('crop') as string

	if (!imageUrl || !cropString) {
		return new Response('Missing image URL or crop data', { status: 400 })
	}

	const crop = JSON.parse(cropString)

	try {
		const response = await fetch(imageUrl)
		if (!response.ok) {
			return new Response('Failed to fetch image', { status: response.status })
		}
		const imageBuffer = await response.arrayBuffer()

		const { x, y, width, height } = crop

		const croppedImageBuffer = await sharp(Buffer.from(imageBuffer))
			.extract({
				left: Math.round(x),
				top: Math.round(y),
				width: Math.round(width),
				height: Math.round(height),
			})
			.toBuffer()

		return new Response(new Uint8Array(croppedImageBuffer), {
			headers: {
				'Content-Type': 'image/jpeg',
				'Content-Disposition': 'attachment; filename="cropped-image.jpg"',
			},
		})
	} catch (error) {
		console.error(error)
		return new Response('Error cropping image', { status: 500 })
	}
}
```

:::

## Reference
