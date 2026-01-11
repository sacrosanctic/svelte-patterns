---
title: Katex
publish: false
tags:
---

## Describe the problem

```sh
pnpm i -D marked katex marked-katex-extension
```

[repl](https://svelte.dev/playground/hello-world?version=5.43.6#H4sIAAAAAAAAA21RXYvbMBD8K8tykITmbLhH1wnXh4ODFlr6WvVAsTZnXeSVq13nA-P_XmynNAf3ICGNZndmVj2ybQgLfKYQIpxiCg6W5LySW-Ea9z6QYPGrR720I28EcP2v6kvbZnKkoCO2s0If4VVkJVbBAkupkm91a9iob9qYFPrGpgO5AfYpNmBwvhr8fMOZsa9W6fyedn8YsXs6K7H4yHMZG81z6MTzK8wuipqsgx1VthOCSgQqywuFHcEsQQ48g9YEP59-fLt2uKovJpHcedF8OmaN56wSWUwexzW7yTqh5Y3XZQ9ap3j6zk8pxVTA3gYhGFarqbCKLAqx07ZT2FxDZq1NQkuDk1IBdxVswBhj2mbc5U_S3r48wCfYvTwMdwbHXmX-f65c3kTeGgajZfB8gERhY1D0EkhqIjUIdaL9xmCt2kqR55Xj7E0cBX9MGZPm3DZz4sdglUQ_mIFBqFIUicm_et4YtBz50sRODG4nZ-_cGC6dP07_3z_W2oRr_mGkji-4RqWzYqGpo-H3GtX6cPLssJimN_wF0cqX7LICAAA)

the jist of it is this, some consideration should be made about whether the html is rendered on the server or the client as both is valid depending on the usecase.

:::code-group

```ts
import { marked } from 'marked'
import markedKatex from 'marked-katex-extension'
import katex from 'katex'
import md from 'foo.md?raw'

marked.use(markedKatex({ throwOnError: false }))

export const load = async () => {
	return {
		output: marked(md, { async: false }),
	}
}
```

```svelte
<script>
	import 'katex/dist/katex.min.css'

	let { props } = $props()
</script>

{@html props.output}
```

:::

## Reference
