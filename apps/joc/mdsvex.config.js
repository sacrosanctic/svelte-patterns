import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { escapeSvelte } from 'mdsvex'
import { createHighlighter } from 'shiki'
import rehypeSlug from 'rehype-slug'

import { remarkCodeBlock } from './src/lib/unified-plugins/remark-code-block.js'
import { remarkCodeGroup } from './src/lib/unified-plugins/remark-code-group.js'
import { remarkCustomContainers } from './src/lib/unified-plugins/remark-custom-containers.js'
import { remarkImageTransform } from './src/lib/unified-plugins/remark-image-transform.js'
import { remarkSvelteRepl } from './src/lib/unified-plugins/remark-svelte-repl.js'
import { remarkSveltelabRepl } from './src/lib/unified-plugins/remark-sveltelab-repl.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getHighlighter = async () =>
	await createHighlighter({
		themes: ['poimandres'],
		langs: ['javascript', 'typescript', 'svelte', 'jsx', 'css', 'html', 'json'],
	})

/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
	extensions: ['.md'],
	layout: { _: join(__dirname, './src/lib/layouts/default/index.svelte') },
	remarkPlugins: [
		//
		remarkSvelteRepl,
		remarkSveltelabRepl,
		remarkCodeBlock,
		remarkCodeGroup,
		remarkCustomContainers,
		remarkImageTransform,
	],
	rehypePlugins: [rehypeSlug],
	highlight: {
		highlighter: async (code, lang) => {
			const highlighter = await getHighlighter()
			const html = highlighter.codeToHtml(code, { lang: lang ?? 'text', theme: 'poimandres' })
			const escapedHtml = escapeSvelte(html)
			return '{@html `' + escapedHtml + '` }'
		},
	},
}
