import { sveltekit } from '@sveltejs/kit/vite'
import { enhancedImages } from '@sveltejs/enhanced-img'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path, { relative, resolve } from 'node:path'
import fs from 'node:fs'
import { compile } from 'mdsvex'
import { visit } from 'unist-util-visit'

export default defineConfig({
	plugins: [
		// {
		// 	name: 'virtual-svelte-gen',
		// 	resolveId(id) {
		// 		if (id === 'virtual:Banner.svelte') {
		// 			// We add the .svelte extension so the Svelte plugin knows what to do
		// 			return '\0virtual:Banner.svelte'
		// 		}
		// 	},
		// 	async load(id) {
		// 		if (id === '\0virtual:Banner.svelte') {
		// 			const configPath = path.resolve(__dirname, './src/content/test1/boring.md')

		// 			// 1. Tell Vite to watch this physical file
		// 			this.addWatchFile(configPath)

		// 			// 2. Read the content
		// 			const content = fs.readFileSync(configPath, 'utf-8')
		// 			console.log(content)
		// 			const result = await compile(content, {
		// 				// rehypePlugins: [asdf, enhanceImgRehypePlugin],
		// 			})

		// 			// Return raw Svelte code as a string
		// 			return result
		// 		}
		// 	},
		// },
		tailwindcss(),
		enhancedImages(), // must come before the SvelteKit plugin
		sveltekit(),
	],
})

// import { findAndReplace } from 'hast-util-find-and-replace'

/**
 * Custom rehype plugin to replace <img> elements with <enhance-img> elements
 * Uses hast-util-find-and-replace to find img elements in HTML AST and replace them
 */

import type { Root } from 'hast'
function enhanceImgRehypePlugin() {
	return (tree: Root) => {
		console.log('🔍 enhanceImgRehypePlugin: Processing HAST tree')
		// console.log('🌳 Tree structure:', JSON.stringify(tree, null, 2))
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName !== 'img') return

			console.log(node)
			node.tagName = 'enhanced:img'
			console.log(node)
		})

		// findAndReplace(tree, [[/img/gi, 'enhanced-img']])

		console.log('✨ enhanceImgRehypePlugin: Processing complete')
	}
}

function asdf() {
	return (tree: Root) => {
		console.log('🔍 enhanceImgRehypePlugin: Processing HAST tree')
		// console.log('🌳 Tree structure:', JSON.stringify(tree, null, 2))
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName !== 'img') return
			const file = './src/content/test1/boring.md'

			console.log(node)
			console.log(process.cwd())
			const newpath = relative(process.cwd(), node.properties!.src as string)
			console.log(newpath)
			node.properties.src = newpath
			// node.tagName = 'enhanced:img'
		})

		// findAndReplace(tree, [[/img/gi, 'enhanced-img']])

		console.log('✨ enhanceImgRehypePlugin: Processing complete')
	}
}
