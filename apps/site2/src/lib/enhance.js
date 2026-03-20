// import { findAndReplace } from 'hast-util-find-and-replace'

import { visit } from 'unist-util-visit'

/**
 * Custom rehype plugin to replace <img> elements with <enhance-img> elements
 * Uses hast-util-find-and-replace to find img elements in HTML AST and replace them
 */
export function enhanceImgRehypePlugin() {
	return (/** @type {import("hast").Nodes} */ tree) => {
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
