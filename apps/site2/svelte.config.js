import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex } from 'mdsvex'
import { enhanceImgRehypePlugin } from './src/lib/enhance.js'
import { markdocPreprocess } from 'markdoc-svelte'
import { Markdoc } from 'markdoc-svelte'
import nodes from './src/lib/markdocs/nodes.ts'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		// mdsvex({
		// 	extensions: ['.md'],
		// 	rehypePlugins: [enhanceImgRehypePlugin],
		// }),
		markdocPreprocess({ nodes }),
	],
	kit: { adapter: adapter() },
}

export default config
